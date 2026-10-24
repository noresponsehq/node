/**
 * Late-result handlers. Hand-written; not generated.
 *
 * An assessment can be revised after the account creation was allowed: a slow source
 * settles and the account's decision rises. NoResponse sends the new version as
 * a signed assessment.updated webhook. handleLateResult verifies that delivery
 * with constructEvent, picks an action from your policy, and acts through the
 * auth provider's admin API: revoke the user's sessions or ban the user.
 *
 * The handler verifies the delivery itself, so it never acts on an unverified
 * event, and it never acts on a test event from webhookEndpoints.sendTestEvent.
 * The provider calls are thin: you pass the credentials, and each action is
 * the provider's documented admin endpoint. A provider 404 for a user or
 * session that is already gone counts as done, so a repeated delivery is safe.
 */
import type { AccountRiskChanged } from "./models/account-risk-changed.js";
import type { Assessment } from "./models/assessment.js";
import type { WebhookEvent } from "./models/webhook-event.js";
import { constructEvent, type ConstructEventOptions, type HeaderInput, type WebhookSecrets } from "./webhooks.js";

/** What to do to the user. "ban" also ends every session. */
export type LateResultAction = "none" | "revoke_sessions" | "ban";

/** The action for each account decision (account.risk.decision). A decision you leave out does nothing. */
export type LateResultPolicy = Readonly<Partial<Record<"allow" | "step_up" | "review" | "block", LateResultAction>>>;

/** Revoke sessions on review and block; do nothing on allow or step_up. Banning is opt-in. */
export const DEFAULT_LATE_RESULT_POLICY: LateResultPolicy = Object.freeze({
  allow: "none",
  step_up: "none",
  review: "revoke_sessions",
  block: "revoke_sessions",
});

/** The two admin actions, for one auth provider. Build one with clerkActions, workosActions or auth0Actions. */
export interface LateResultProvider {
  readonly name: string;
  /** End every active session of the user. */
  revokeSessions(userId: string): Promise<void>;
  /** Stop the user signing in again and end their sessions. */
  ban(userId: string): Promise<void>;
  /**
   * Optional. Take `action` and return the action that ran. A provider that
   * has to do more than it was asked implements this: auth0Actions answers
   * "ban" when the tenant's plan has no sessions API and it blocked the user
   * to end their sessions. When absent, handleLateResult calls ban or
   * revokeSessions and reports the action asked for.
   */
  act?(action: "revoke_sessions" | "ban", userId: string): Promise<LateResultAction>;
}

/** A provider that reports the action that ran, as auth0Actions does. */
export interface LateResultActor extends LateResultProvider {
  act(action: "revoke_sessions" | "ban", userId: string): Promise<LateResultAction>;
}

export type LateResultOptions = ConstructEventOptions & {
  /** Account decision to action. Defaults to DEFAULT_LATE_RESULT_POLICY. */
  policy?: LateResultPolicy;
  /**
   * The provider user id for the assessment's detail.account_id. Defaults to the
   * account_id itself, as when you assess with the provider's user id.
   * Return null or undefined to take no action.
   */
  userId?: (accountId: string, event: WebhookEvent) => string | null | undefined | Promise<string | null | undefined>;
};

export type LateResult = {
  /** The verified event. Answer an endpoint.verification with a WebhookVerificationResponse echoing its challenge. */
  event: WebhookEvent;
  /**
   * The action that ran. "none" when the policy, the event or the user id
   * called for nothing. It can be stronger than the policy's action when the
   * provider had to fall back: auth0Actions reports "ban" when it blocked the
   * user because the tenant's plan cannot end sessions.
   */
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
  /** The provider's error code from the response body, such as Auth0's errorCode "insufficient_scope", when it sent one. */
  readonly code: string | undefined;
  constructor(provider: string, status: number, message: string, code?: string) {
    super(message);
    this.name = "ProviderActionError";
    this.provider = provider;
    this.status = status;
    this.code = code;
  }
}

const ACTIONS: readonly string[] = ["none", "revoke_sessions", "ban"];

/**
 * The action your policy names for a verified event's account.risk.decision. Only a complete or partial
 * assessment whose account has a decision can act; a pending one and a test event from
 * webhookEndpoints.sendTestEvent never do.
 */
export function lateResultAction(event: WebhookEvent, policy: LateResultPolicy = DEFAULT_LATE_RESULT_POLICY): LateResultAction {
  if (event.type !== "assessment.updated" && event.type !== "account.risk_changed") return "none";
  if (event.type === "assessment.updated" && event.data.status === "expired") return "none";
  if (event.type === "assessment.updated" && event.test === true) return "none";
  const data = event.data as Assessment;
  // A pending answer carries an earlier assessment's decision; acting on it would repeat that action.
  if (event.type === "assessment.updated" && data.status === "pending") return "none";
  if (event.type === "account.risk_changed") {
    // The event is sent when any flow's decision changes; sessions are about the login
    // decision, so an unchanged login decision acts on nothing.
    const changed = event.data as AccountRiskChanged;
    if (changed.previousDecisionsByFlow.login === changed.account.decisionsByFlow.login) return "none";
  }
  const decision: string | undefined = event.type === "account.risk_changed"
    ? (event.data as AccountRiskChanged).account.decisionsByFlow.login
    : data.account?.risk.decision;
  if (decision !== "allow" && decision !== "step_up" && decision !== "review" && decision !== "block") return "none";
  const action = Object.prototype.hasOwnProperty.call(policy, decision) ? policy[decision] : undefined;
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
  const event = await constructEvent(payload, headers, secrets, verify);
  const action = lateResultAction(event, policy);
  if (action === "none") return { event, action: "none" };
  const accountId = event.type === "account.risk_changed"
    ? event.data.account.id
    : (event.data as Assessment).detail.accountId;
  const userId = resolve ? await resolve(accountId, event) : accountId;
  if (userId === null || userId === undefined || userId === "") return { event, action: "none" };
  let ran: LateResultAction = action;
  if (provider.act) ran = await provider.act(action, userId);
  else if (action === "ban") await provider.ban(userId);
  else await provider.revokeSessions(userId);
  return { event, action: ran, userId };
}

type Fetch = typeof fetch;
type Call = { method: string; path: string; query?: Record<string, string>; body?: unknown };

/**
 * Rate limits. Auth0 answers 429 when the Management API rate limit is hit,
 * and a 429 means it did not act, so the call is safe to send again, a DELETE
 * included. One revoke or ban waits at most RATE_LIMIT_BUDGET_MS in all, and
 * each call retries at most RATE_LIMIT_RETRIES times: it waits Retry-After
 * seconds, else until X-RateLimit-Reset (Unix seconds), else 250 ms, 500 ms,
 * 1 s, 2 s. A wait that would pass the budget is not started: the 429 throws
 * at once as ProviderActionError, the webhook answers 5xx and NoResponse
 * delivers it again later. The budget keeps the handler inside the 5 s a
 * delivery has to be answered.
 */
const RATE_LIMIT_RETRIES = 4;
const RATE_LIMIT_BUDGET_MS = 3_000;
const RATE_LIMIT_BACKOFF_MS = 250;

/** The time spent waiting out 429s in one provider action. */
type RateLimitBudget = { waitedMs: number };

/** How long a 429 asks to wait, in milliseconds. */
function rateLimitWaitMs(headers: Headers, retry: number): number {
  const after = headers.get("retry-after")?.trim();
  if (after) {
    const seconds = Number(after);
    if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
  }
  const reset = headers.get("x-ratelimit-reset")?.trim();
  if (reset) {
    const at = Number(reset);
    if (Number.isFinite(at)) return Math.max(0, at * 1000 - Date.now());
  }
  return RATE_LIMIT_BACKOFF_MS * 2 ** retry;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function caller(name: string, baseUrl: string, authorization: string, fetcher: Fetch | undefined, rateLimit?: RateLimitBudget) {
  const base = baseUrl.replace(/\/+$/, "");
  const run = fetcher ?? globalThis.fetch;
  // Every call names a user or a session. A 404 means it is already gone, so
  // revoke and ban count it as done and a repeated delivery does not fail.
  return async ({ method, path, query, body }: Call): Promise<unknown> => {
    const url = new URL(base + path);
    for (const [key, value] of Object.entries(query ?? {})) url.searchParams.set(key, value);
    const headers: Record<string, string> = { authorization, accept: "application/json" };
    if (body !== undefined) headers["content-type"] = "application/json";
    for (let retry = 0; ; retry++) {
      const response = await run(url, { method, headers, ...(body !== undefined ? { body: JSON.stringify(body) } : {}) });
      const text = await response.text();
      if (response.status === 429 && rateLimit && retry < RATE_LIMIT_RETRIES) {
        const wait = rateLimitWaitMs(response.headers, retry);
        if (rateLimit.waitedMs + wait <= RATE_LIMIT_BUDGET_MS) {
          rateLimit.waitedMs += wait;
          await sleep(wait);
          continue;
        }
      }
      if (response.status === 404) return undefined;
      if (!response.ok) throw new ProviderActionError(name, response.status, `${name} ${method} ${path} answered ${response.status}`, errorCode(text));
      if (!text) return undefined;
      try {
        return JSON.parse(text);
      } catch {
        return undefined;
      }
    }
  };
}

/** The error code in a provider's error body: Auth0's errorCode, or a top-level code. */
function errorCode(text: string): string | undefined {
  try {
    const body = JSON.parse(text) as { errorCode?: unknown; code?: unknown } | null;
    const code = body?.errorCode ?? body?.code;
    return typeof code === "string" && code !== "" ? code : undefined;
  } catch {
    return undefined;
  }
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
  /**
   * A Management API access token with update:users, delete:sessions,
   * delete:refresh_tokens, read:device_credentials and delete:device_credentials.
   */
  token: string;
  fetch?: Fetch;
};

/** Auth0 answers 403 with errorCode feature_not_enabled when the tenant's plan does not include an endpoint. */
const notOnPlan = (error: unknown): boolean => error instanceof ProviderActionError && error.status === 403 && error.code === "feature_not_enabled";

/**
 * Auth0 Management API.
 *
 * revokeSessions deletes every session (DELETE /users/{id}/sessions) and
 * every refresh token (DELETE /users/{id}/refresh-tokens). ban first sets
 * blocked: true (PATCH /users/{id}), then does the same.
 *
 * Auth0 offers the sessions and refresh-token endpoints on Enterprise plans
 * only; on other plans they answer 403 feature_not_enabled. Then:
 * - refresh tokens are deleted one by one through
 *   /device-credentials (types refresh_token and rotating_refresh_token),
 *   which every plan has;
 * - a login session cannot be ended, so revokeSessions blocks the user
 *   (PATCH blocked: true) before deleting the refresh tokens, and act
 *   reports "ban". Unblock the user in the dashboard to undo it.
 * Any other refusal, such as 403 insufficient_scope, throws.
 *
 * A 429 from the Management API is waited out and retried: Retry-After, else
 * X-RateLimit-Reset, else 250 ms doubling, at most 4 retries a call and 3 s of
 * waiting a revoke or ban. Past that the 429 throws as ProviderActionError.
 */
export function auth0Actions(options: Auth0ActionsOptions): LateResultActor {
  if (!options?.token) throw new TypeError("auth0Actions needs token");
  const base = options.baseUrl ?? (options.domain ? `https://${options.domain}/api/v2` : undefined);
  if (!base) throw new TypeError("auth0Actions needs domain or baseUrl");
  type Caller = ReturnType<typeof caller>;
  // A fresh caller per action, so each revoke or ban has its own rate-limit budget.
  const session = (): Caller => caller("auth0", base, `Bearer ${options.token}`, options.fetch, { waitedMs: 0 });
  const block = (call: Caller, user: string) => call({ method: "PATCH", path: `/users/${user}`, body: { blocked: true } });
  /** End every session; false when the plan has no sessions API. */
  const deleteSessions = async (call: Caller, user: string): Promise<boolean> => {
    try {
      await call({ method: "DELETE", path: `/users/${user}/sessions` });
      return true;
    } catch (error) {
      if (notOnPlan(error)) return false;
      throw error;
    }
  };
  const deleteRefreshTokens = async (call: Caller, userId: string, user: string): Promise<void> => {
    try {
      await call({ method: "DELETE", path: `/users/${user}/refresh-tokens` });
      return;
    } catch (error) {
      if (!notOnPlan(error)) throw error;
    }
    // Collect every id before deleting any, so the pages do not shift underneath.
    const ids: string[] = [];
    for (const type of ["refresh_token", "rotating_refresh_token"]) {
      for (let page = 0; page < 10; page++) {
        const body = await call({ method: "GET", path: "/device-credentials", query: { user_id: userId, type, page: String(page), per_page: "100" } });
        const list = Array.isArray(body) ? (body as Array<{ id?: unknown }>) : [];
        for (const credential of list) if (typeof credential?.id === "string" && credential.id) ids.push(credential.id);
        if (list.length < 100) break;
      }
    }
    for (const id of ids) await call({ method: "DELETE", path: `/device-credentials/${encodeURIComponent(id)}` });
  };
  const revoke = async (userId: string): Promise<LateResultAction> => {
    const user = segment(userId);
    const call = session();
    const ended = await deleteSessions(call, user);
    // Without the sessions API a login session survives; blocking is the only way to end it.
    if (!ended) await block(call, user);
    await deleteRefreshTokens(call, userId, user);
    return ended ? "revoke_sessions" : "ban";
  };
  const ban = async (userId: string): Promise<void> => {
    const user = segment(userId);
    const call = session();
    await block(call, user);
    // The block already ends a session the plan cannot delete.
    await deleteSessions(call, user);
    await deleteRefreshTokens(call, userId, user);
  };
  return {
    name: "auth0",
    async revokeSessions(userId) {
      await revoke(userId);
    },
    ban,
    async act(action, userId) {
      if (action === "ban") {
        await ban(userId);
        return "ban";
      }
      return revoke(userId);
    },
  };
}

export type LogOnlyActionsOptions = {
  /**
   * Receives one line per action the handler would take, with the action and
   * the user id. Defaults to console.info.
   */
  log?: (message: string, details: { action: Exclude<LateResultAction, "none">; userId: string }) => void;
};

/**
 * A provider for an app with its own login, or for trying the handler before
 * you wire up a real one. revokeSessions and ban each log what they would do
 * and call nothing: no request leaves your process. Replace it with your own
 * LateResultProvider once you know what revoking and banning mean in your app.
 */
export function logOnlyActions(options: LogOnlyActionsOptions = {}): LateResultProvider {
  const log = options.log ?? ((message: string) => console.info(message));
  return {
    name: "log_only",
    async revokeSessions(userId) {
      segment(userId);
      log(`NoResponse late result (log only): would revoke every session of user ${userId}`, { action: "revoke_sessions", userId });
    },
    async ban(userId) {
      segment(userId);
      log(`NoResponse late result (log only): would ban user ${userId} and end their sessions`, { action: "ban", userId });
    },
  };
}
