/**
 * Late-result handlers. Hand-written; not generated.
 *
 * An assessment can be revised after the signup was allowed: a slow source
 * settles and the recommendation rises. NoResponse sends the new version as a
 * signed assessment.updated webhook. handleLateResult verifies that delivery
 * with constructEvent, picks an action from your policy, and acts through the
 * auth provider's admin API: revoke the user's sessions or ban the user.
 *
 * The handler verifies the delivery itself, so it never acts on an unverified
 * event, and it never acts on a test event from webhookEndpoints.sendTestEvent.
 * The provider calls are thin: you pass the credentials, and each action is
 * the provider's documented admin endpoint. A provider 404 for a user or
 * session that is already gone counts as done, so a repeated delivery is safe.
 */
import { constructEvent, type ConstructEventOptions, type HeaderInput, type WebhookEvent, type WebhookSecrets } from "./webhooks.js";

/** What to do to the user. "ban" also ends every session. */
export type LateResultAction = "none" | "revoke_sessions" | "ban";

/** The action for each recommendation. A recommendation you leave out does nothing. */
export type LateResultPolicy = Readonly<Partial<Record<"allow" | "step_up" | "review", LateResultAction>>>;

/** Revoke sessions on review; do nothing on allow or step_up. Banning is opt-in. */
export const DEFAULT_LATE_RESULT_POLICY: LateResultPolicy = Object.freeze({ allow: "none", step_up: "none", review: "revoke_sessions" });

/** The two admin actions, for one auth provider. Build one with clerkActions, workosActions or auth0Actions. */
export interface LateResultProvider {
  readonly name: string;
  /** End every active session of the user. */
  revokeSessions(userId: string): Promise<void>;
  /** Stop the user signing in again and end their sessions. */
  ban(userId: string): Promise<void>;
}

export type LateResultOptions = ConstructEventOptions & {
  /** Recommendation to action. Defaults to DEFAULT_LATE_RESULT_POLICY. */
  policy?: LateResultPolicy;
  /**
   * The provider user id for the assessment's account_id. Defaults to the
   * account_id itself, as when you assess with the provider's user id.
   * Return null or undefined to take no action.
   */
  userId?: (accountId: string, event: WebhookEvent) => string | null | undefined | Promise<string | null | undefined>;
};

export type LateResult = {
  /** The verified event. Answer an endpoint.verification with verificationResponse(event). */
  event: WebhookEvent;
  /** The action taken. "none" when the policy, the event or the user id called for nothing. */
  action: LateResultAction;
  /** The provider user id acted on, when an action was taken. */
  userId?: string;
};

/**
 * Thrown when the provider's admin API refuses a call. Answer the webhook with a 5xx so NoResponse retries it.
 * A 404 is never thrown: the user or session is already gone, so the action is done.
 */
export class ProviderActionError extends Error {
  readonly provider: string;
  readonly status: number;
  constructor(provider: string, status: number, message: string) {
    super(message);
    this.name = "ProviderActionError";
    this.provider = provider;
    this.status = status;
  }
}

const ACTIONS: readonly string[] = ["none", "revoke_sessions", "ban"];

/**
 * The action your policy names for a verified event. Only a served assessment with a recommendation can act;
 * a test event from webhookEndpoints.sendTestEvent never does.
 */
export function lateResultAction(event: WebhookEvent, policy: LateResultPolicy = DEFAULT_LATE_RESULT_POLICY): LateResultAction {
  if (event.type !== "assessment.updated" || event.data.status === "expired") return "none";
  if ("test" in event && event.test === true) return "none";
  const data = event.data as { recommendation?: string; risk?: { recommendation?: string } };
  const recommendation = data.recommendation ?? data.risk?.recommendation;
  if (recommendation !== "allow" && recommendation !== "step_up" && recommendation !== "review") return "none";
  const action = Object.prototype.hasOwnProperty.call(policy, recommendation) ? policy[recommendation] : undefined;
  if (action === undefined) return "none";
  if (!ACTIONS.includes(action)) throw new TypeError(`unknown late result action ${String(action)}`);
  return action;
}

/**
 * Verify a webhook delivery and apply your policy to it.
 *
 * `payload`, `headers`, `secrets` and the tolerance options are exactly what
 * constructEvent takes; a delivery that fails verification throws
 * WebhookVerificationError before any provider call. A test event acts on
 * nothing. Revoke and ban are safe to repeat, but deduplicate on
 * `result.event.id` and ignore versions older than one you have acted on.
 */
export async function handleLateResult(
  payload: Uint8Array | string,
  headers: HeaderInput,
  secrets: WebhookSecrets,
  provider: LateResultProvider,
  options: LateResultOptions = {},
): Promise<LateResult> {
  const { policy, userId: resolve, ...verify } = options;
  const event = constructEvent(payload, headers, secrets, verify);
  const action = lateResultAction(event, policy);
  if (action === "none" || event.type !== "assessment.updated") return { event, action: "none" };
  const accountId = event.data.accountId;
  const userId = resolve ? await resolve(accountId, event) : accountId;
  if (userId === null || userId === undefined || userId === "") return { event, action: "none" };
  if (action === "ban") await provider.ban(userId);
  else await provider.revokeSessions(userId);
  return { event, action, userId };
}

type Fetch = typeof fetch;
type Call = { method: string; path: string; query?: Record<string, string>; body?: unknown };

function caller(name: string, baseUrl: string, authorization: string, fetcher: Fetch | undefined) {
  const base = baseUrl.replace(/\/+$/, "");
  const run = fetcher ?? globalThis.fetch;
  // Every call names a user or a session. A 404 means it is already gone, so
  // revoke and ban count it as done and a repeated delivery does not fail.
  return async ({ method, path, query, body }: Call): Promise<unknown> => {
    const url = new URL(base + path);
    for (const [key, value] of Object.entries(query ?? {})) url.searchParams.set(key, value);
    const headers: Record<string, string> = { authorization, accept: "application/json" };
    if (body !== undefined) headers["content-type"] = "application/json";
    const response = await run(url, { method, headers, ...(body !== undefined ? { body: JSON.stringify(body) } : {}) });
    const text = await response.text();
    if (response.status === 404) return undefined;
    if (!response.ok) throw new ProviderActionError(name, response.status, `${name} ${method} ${path} answered ${response.status}`);
    if (!text) return undefined;
    try {
      return JSON.parse(text);
    } catch {
      return undefined;
    }
  };
}

const segment = (id: string): string => {
  if (typeof id !== "string" || id === "") throw new TypeError("user id must be a non-empty string");
  return encodeURIComponent(id);
};

function sessions(body: unknown): Array<{ id?: unknown; status?: unknown }> {
  if (Array.isArray(body)) return body;
  const data = (body as { data?: unknown } | undefined)?.data;
  return Array.isArray(data) ? data : [];
}

export type ClerkActionsOptions = {
  /** Clerk secret key (sk_...). */
  secretKey: string;
  /** Default https://api.clerk.com/v1. */
  baseUrl?: string;
  fetch?: Fetch;
};

/**
 * Clerk Backend API. revokeSessions lists the user's active sessions
 * (GET /sessions?user_id&status=active) and revokes each
 * (POST /sessions/{id}/revoke). ban is POST /users/{id}/ban, which revokes
 * every session and blocks sign-in.
 */
export function clerkActions(options: ClerkActionsOptions): LateResultProvider {
  if (!options?.secretKey) throw new TypeError("clerkActions needs secretKey");
  const call = caller("clerk", options.baseUrl ?? "https://api.clerk.com/v1", `Bearer ${options.secretKey}`, options.fetch);
  const PAGE = 100;
  return {
    name: "clerk",
    async revokeSessions(userId) {
      segment(userId);
      const active: string[] = [];
      for (let offset = 0; offset < PAGE * 1000; offset += PAGE) {
        const page = sessions(
          await call({ method: "GET", path: "/sessions", query: { user_id: userId, status: "active", limit: String(PAGE), offset: String(offset) } }),
        );
        for (const s of page) if (s.status === "active" && typeof s.id === "string" && s.id) active.push(s.id);
        if (page.length < PAGE) break;
      }
      for (const id of active) await call({ method: "POST", path: `/sessions/${encodeURIComponent(id)}/revoke` });
    },
    async ban(userId) {
      await call({ method: "POST", path: `/users/${segment(userId)}/ban` });
    },
  };
}

export type WorkOSActionsOptions = {
  /** WorkOS API key (sk_...). */
  apiKey: string;
  /** Default https://api.workos.com. */
  baseUrl?: string;
  fetch?: Fetch;
};

/**
 * WorkOS User Management. revokeSessions pages through
 * GET /user_management/users/{id}/sessions and revokes each active one with
 * POST /user_management/sessions/revoke. WorkOS has no block or ban, so ban
 * revokes the sessions and then deletes the user
 * (DELETE /user_management/users/{id}); deletion is permanent.
 */
export function workosActions(options: WorkOSActionsOptions): LateResultProvider {
  if (!options?.apiKey) throw new TypeError("workosActions needs apiKey");
  const call = caller("workos", options.baseUrl ?? "https://api.workos.com", `Bearer ${options.apiKey}`, options.fetch);
  const revokeSessions = async (userId: string): Promise<void> => {
    const user = segment(userId);
    const active: string[] = [];
    let after: string | undefined;
    for (let round = 0; round < 1000; round++) {
      const query: Record<string, string> = { limit: "100" };
      if (after) query["after"] = after;
      const body = (await call({ method: "GET", path: `/user_management/users/${user}/sessions`, query })) as { list_metadata?: { after?: unknown } } | undefined;
      for (const s of sessions(body)) if (s.status === "active" && typeof s.id === "string" && s.id) active.push(s.id);
      const next = body?.list_metadata?.after;
      if (typeof next !== "string" || next === "") break;
      after = next;
    }
    for (const id of active) await call({ method: "POST", path: "/user_management/sessions/revoke", body: { session_id: id } });
  };
  return {
    name: "workos",
    revokeSessions,
    async ban(userId) {
      await revokeSessions(userId);
      await call({ method: "DELETE", path: `/user_management/users/${segment(userId)}` });
    },
  };
}

export type Auth0ActionsOptions = {
  /** Your Auth0 tenant domain, such as example.eu.auth0.com. The Management API is https://{domain}/api/v2. */
  domain?: string;
  /** The Management API base URL in place of domain. */
  baseUrl?: string;
  /** A Management API access token with update:users, delete:sessions and delete:refresh_tokens. */
  token: string;
  fetch?: Fetch;
};

/**
 * Auth0 Management API. revokeSessions deletes every session
 * (DELETE /users/{id}/sessions) and refresh token
 * (DELETE /users/{id}/refresh-tokens). ban first sets blocked: true
 * (PATCH /users/{id}), then does the same.
 */
export function auth0Actions(options: Auth0ActionsOptions): LateResultProvider {
  if (!options?.token) throw new TypeError("auth0Actions needs token");
  const base = options.baseUrl ?? (options.domain ? `https://${options.domain}/api/v2` : undefined);
  if (!base) throw new TypeError("auth0Actions needs domain or baseUrl");
  const call = caller("auth0", base, `Bearer ${options.token}`, options.fetch);
  const revokeSessions = async (userId: string): Promise<void> => {
    const user = segment(userId);
    await call({ method: "DELETE", path: `/users/${user}/sessions` });
    await call({ method: "DELETE", path: `/users/${user}/refresh-tokens` });
  };
  return {
    name: "auth0",
    revokeSessions,
    async ban(userId) {
      await call({ method: "PATCH", path: `/users/${segment(userId)}`, body: { blocked: true } });
      await revokeSessions(userId);
    },
  };
}
