/**
 * The NoResponse client. Hand-written; not generated.
 *
 * Wraps the generated client so that construction reads the environment,
 * every method returns its model with `meta` (request id, Retry-After,
 * Location, Idempotent-Replayed), idempotency keys are generated when
 * omitted, history pages iterate their items, assessments.wait exists and
 * keyUsage.buffer batches key usage in the background.
 */
import { NoResponse as GeneratedClient } from "./sdk/sdk.js";
import type { Accounts as GeneratedAccounts } from "./sdk/accounts.js";
import type { Assessments as GeneratedAssessments } from "./sdk/assessments.js";
import type { Integrations as GeneratedIntegrations } from "./sdk/integrations.js";
import type { KeyUsage as GeneratedKeyUsage } from "./sdk/key-usage.js";
import type { Keys as GeneratedKeys } from "./sdk/keys.js";
import type { Settings as GeneratedSettings } from "./sdk/settings.js";
import type { WebhookEndpoints as GeneratedWebhookEndpoints } from "./sdk/webhook-endpoints.js";
import type { NoResponseCore } from "./core.js";
import { SDK_METADATA, type SDKOptions } from "./lib/config.js";
import { HTTPClient, type Fetcher } from "./lib/http.js";
import type { Logger } from "./lib/logger.js";
import type { RetryConfig } from "./lib/retries.js";
import type { RequestOptions } from "./lib/sdks.js";
import type * as models from "./models/index.js";
import type * as operations from "./models/operations/index.js";
import type { Paginator } from "./types/operations.js";
import { toMeta, withMeta, type ResponseMeta, type WithMeta } from "./meta.js";
import { waitForAssessment, type WaitOptions } from "./wait.js";
import { KeyUsageBuffer, type KeyUsageBufferOptions } from "./key-usage.js";
import { constructEvent } from "./webhooks.js";

export const DEFAULT_BASE_URL = "https://api.noresponse.org";
export const DEFAULT_TIMEOUT_MS = 10_000;

export type NoResponseOptions = {
  /** Your API key. Defaults to NORESPONSE_API_KEY. A function is called before each request. */
  apiKey?: string | (() => Promise<string>);
  /** Defaults to NORESPONSE_BASE_URL, then https://api.noresponse.org. HTTPS is required except for localhost. */
  baseUrl?: string;
  /** Per-request timeout in milliseconds. Default 10 000. */
  timeoutMs?: number;
  /** A fetch implementation, for tests or a custom agent. */
  fetch?: Fetcher;
  /** Receives one line per request and response: method, URL, status and request id. Headers and bodies are left out. Defaults to console when NORESPONSE_LOG=debug. */
  logger?: Logger;
  /** Override the retry policy. Default: 408, 429, 5xx and connection errors, backoff 500 ms to 8 s, at most 30 s in all. */
  retryConfig?: RetryConfig;
  /** A custom HTTP client. Takes precedence over `fetch`. */
  httpClient?: HTTPClient;
  /** Override the User-Agent header. */
  userAgent?: string;
};

export type CreateOptions = RequestOptions & {
  /** 16 to 128 characters of [A-Za-z0-9._:-]. Generated (a UUID) when omitted and reused on every retry of this call. */
  idempotencyKey?: string;
};

export type GetOptions = RequestOptions & {
  responseMode?: models.ResponseMode;
};

export type ListAssessmentsOptions = RequestOptions & {
  /** Items per page, 1 to 50. Default 20. */
  limit?: number;
  /** nextCursor from the previous page, unchanged. */
  cursor?: string;
  responseMode?: models.ResponseMode;
};

export type ListDeliveriesOptions = RequestOptions & {
  /** Attempts per page, 1 to 100. Default 20. */
  limit?: number;
  /** nextCursor from the previous page, unchanged. */
  cursor?: string;
};

export type { ResponseMeta, WithMeta, WaitOptions };

/** One page of an endpoint's delivery attempts, newest first. `for await` over it walks every attempt across pages. */
export type DeliveryPage = models.WebhookDeliveryList & {
  meta: ResponseMeta;
  hasMore: boolean;
  /** The next page, or null on the last one. */
  next(): Promise<DeliveryPage | null>;
  [Symbol.asyncIterator](): AsyncIterator<models.WebhookDeliveryAttempt>;
};

/** One page of an account's assessments. `for await` over it walks every item across pages. */
export type AssessmentPage = models.AssessmentList & {
  meta: ResponseMeta;
  hasMore: boolean;
  /** The next page, or null on the last one. */
  next(): Promise<AssessmentPage | null>;
  [Symbol.asyncIterator](): AsyncIterator<models.AssessmentDetail>;
};

function readEnv(name: string): string | undefined {
  const globals = globalThis as { process?: { env?: Record<string, string | undefined> } };
  return globals.process?.env?.[name];
}

function runtime(): string {
  const globals = globalThis as { process?: { versions?: Record<string, string | undefined> }; Bun?: { version?: string }; Deno?: { version?: { deno?: string } } };
  if (globals.Bun?.version) return `bun/${globals.Bun.version}`;
  if (globals.Deno?.version?.deno) return `deno/${globals.Deno.version.deno}`;
  const node = globals.process?.versions?.["node"];
  return node ? `node/${node}` : "unknown";
}

/** Forwards request lines, status lines and request ids to a sink; drops headers and bodies. */
class SafeLogger implements Logger {
  constructor(private readonly sink: Logger) {}
  group(label?: string): void {
    if (label && (label.startsWith("> Request:") || label.startsWith("< Response:"))) this.sink.log(label);
  }
  groupEnd(): void {}
  log(message: unknown, ...args: unknown[]): void {
    if (message === "Status Code:") this.sink.log("Status:", ...args);
    else if (typeof message === "string" && /^x-request-id:/i.test(message)) this.sink.log(message);
  }
}

function debugRequested(): boolean {
  const log = readEnv("NORESPONSE_LOG");
  const debug = readEnv("NORESPONSE_DEBUG");
  return log === "debug" || (debug !== undefined && debug !== "" && debug !== "0" && debug !== "false");
}

export function toSDKOptions(options: NoResponseOptions): SDKOptions {
  const apiKey = options.apiKey ?? readEnv("NORESPONSE_API_KEY");
  if (apiKey === undefined || apiKey === "") {
    throw new TypeError("NoResponse needs an API key: pass { apiKey } or set NORESPONSE_API_KEY");
  }
  if (typeof apiKey === "string" && /[\r\n]/.test(apiKey)) throw new TypeError("apiKey contains a line break");
  const baseUrl = options.baseUrl ?? readEnv("NORESPONSE_BASE_URL") ?? DEFAULT_BASE_URL;
  const url = new URL(baseUrl);
  if (url.search || url.hash || /[?#]$/.test(baseUrl)) throw new TypeError("baseUrl has a query or fragment; pass the origin only");
  if (url.protocol !== "https:" && !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
    throw new TypeError("NoResponse requires HTTPS outside localhost");
  }
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  if (!Number.isInteger(timeoutMs) || timeoutMs <= 0) throw new TypeError("timeoutMs must be a positive integer");
  const sdk: SDKOptions = {
    apiKey,
    serverURL: url.toString().replace(/\/$/, ""),
    timeoutMs,
    userAgent: options.userAgent ?? `noresponse-node/${SDK_METADATA.sdkVersion} (${runtime()})`,
  };
  if (options.httpClient) sdk.httpClient = options.httpClient;
  else if (options.fetch) sdk.httpClient = new HTTPClient({ fetcher: options.fetch });
  if (options.retryConfig) sdk.retryConfig = options.retryConfig;
  const sink = options.logger ?? (debugRequested() ? console : undefined);
  if (sink) sdk.debugLogger = new SafeLogger(sink);
  return sdk;
}

function newIdempotencyKey(): string {
  return globalThis.crypto.randomUUID();
}

type RawResponse = { headers: { [k: string]: Array<string> }; result: models.AssessmentList };
type RawPage<V extends RawResponse> = V & { next: Paginator<V> };

function toPage<V extends RawResponse>(page: RawPage<V>): AssessmentPage {
  const nextCursor = page.result.nextCursor;
  const out: AssessmentPage = {
    ...page.result,
    meta: toMeta(page.headers),
    hasMore: nextCursor !== undefined && nextCursor !== "",
    next: async () => {
      const pending = page.next();
      return pending === null ? null : toPage(await pending);
    },
    async *[Symbol.asyncIterator]() {
      let current: AssessmentPage | null = out;
      while (current !== null) {
        yield* current.items;
        current = await current.next();
      }
    },
  };
  return out;
}

type RawDeliveries = { headers: { [k: string]: Array<string> }; result: models.WebhookDeliveryList };

function toDeliveryPage<V extends RawDeliveries>(page: V & { next: Paginator<V> }): DeliveryPage {
  const nextCursor = page.result.nextCursor;
  const out: DeliveryPage = {
    ...page.result,
    meta: toMeta(page.headers),
    hasMore: nextCursor !== undefined && nextCursor !== "",
    next: async () => {
      const pending = page.next();
      return pending === null ? null : toDeliveryPage(await pending);
    },
    async *[Symbol.asyncIterator]() {
      let current: DeliveryPage | null = out;
      while (current !== null) {
        yield* current.items;
        current = await current.next();
      }
    },
  };
  return out;
}

export class Assessments {
  constructor(private readonly inner: GeneratedAssessments) {}

  /**
   * Assess an account creation, login or purchase. Returns the assessment whether the
   * answer was 200 (complete or partial) or 202 (pending; see meta.retryAfter
   * and assessments.wait). The idempotency key is generated when omitted and
   * reused on every retry of this call.
   */
  async create(
    request: models.AssessmentRequest | operations.CreateAssessmentRequest,
    options: CreateOptions = {},
  ): Promise<WithMeta<models.Assessment>> {
    const { idempotencyKey, ...rest } = options;
    const envelope = "body" in request ? request : undefined;
    const generated: operations.CreateAssessmentRequest = {
      body: envelope ? envelope.body : (request as models.AssessmentRequest),
      idempotencyKey: envelope?.idempotencyKey ?? idempotencyKey ?? newIdempotencyKey(),
    };
    const response = await this.inner.create(generated, rest);
    return withMeta(response.result, response.headers);
  }

  /** Fetch the latest version of one assessment. */
  async get(
    assessmentId: string | operations.GetAssessmentRequest,
    options: GetOptions = {},
  ): Promise<WithMeta<models.Assessment>> {
    const { responseMode, ...rest } = options;
    const request: operations.GetAssessmentRequest =
      typeof assessmentId === "string"
        ? { assessmentId, ...(responseMode !== undefined ? { responseMode } : {}) }
        : assessmentId;
    const response = await this.inner.get(request, rest);
    return withMeta(response.result, response.headers);
  }

  /** Poll until the assessment is complete, honouring Retry-After, for at most timeoutMs (default 30 s); then return a partial answer as it stands or throw APITimeoutError while it is pending. */
  wait(assessmentId: string, options: WaitOptions = {}): Promise<WithMeta<models.Assessment>> {
    return waitForAssessment((id, opts) => this.get(id, opts), assessmentId, options);
  }

  /**
   * One page of an account's unexpired assessments, newest first. Iterate the
   * returned page with `for await` to walk every item across pages, or call
   * `page.next()` yourself.
   */
  async query(request: models.AssessmentQuery, options?: RequestOptions): Promise<AssessmentPage> {
    const page = await this.inner.query(request, options);
    return toPage(page);
  }

  /** Report what you later learned about an assessed account. */
  recordOutcome(
    assessmentId: string,
    params: models.AssessmentOutcomeRequest,
    options?: CreateOptions,
  ): Promise<WithMeta<models.AssessmentOutcome>>;
  recordOutcome(
    request: operations.RecordAssessmentOutcomeRequest,
    options?: CreateOptions,
  ): Promise<WithMeta<models.AssessmentOutcome>>;
  async recordOutcome(
    first: string | operations.RecordAssessmentOutcomeRequest,
    second?: models.AssessmentOutcomeRequest | CreateOptions,
    third: CreateOptions = {},
  ): Promise<WithMeta<models.AssessmentOutcome>> {
    let generated: operations.RecordAssessmentOutcomeRequest;
    let options: CreateOptions;
    if (typeof first === "string") {
      options = third;
      generated = {
        assessmentId: first,
        body: second as models.AssessmentOutcomeRequest,
        idempotencyKey: options.idempotencyKey ?? newIdempotencyKey(),
      };
    } else {
      options = (second as CreateOptions | undefined) ?? {};
      generated = { ...first, idempotencyKey: first.idempotencyKey ?? options.idempotencyKey ?? newIdempotencyKey() };
    }
    const { idempotencyKey: _ignored, ...rest } = options;
    const response = await this.inner.recordOutcome(generated, rest);
    return withMeta(response.result, response.headers);
  }

  /**
   * Delete one assessment and score its account again from what remains.
   * Needs the `history` scope. `account.currentAssessmentId` names the
   * assessment the account's risk now comes from, and is absent when none is
   * left. An unknown or already deleted assessment answers 404 (NotFoundError).
   */
  async delete(assessmentId: string | operations.DeleteAssessmentRequest, options?: RequestOptions): Promise<WithMeta<models.AssessmentDeletion>> {
    const request = typeof assessmentId === "string" ? { assessmentId } : assessmentId;
    const response = await this.inner.delete(request, options);
    return withMeta(response.result, response.headers);
  }
}

/**
 * Your accounts. An account is the accountId you send with your assessments
 * and holds one current risk: the risk of its latest assessment with a
 * decision. Its assessments are its history. Every method needs the
 * `history` scope.
 */
export class Accounts {
  constructor(private readonly inner: GeneratedAccounts) {}

  /** The account's current risk, with a decision for each flow. An account with no decided assessment answers 404 (NotFoundError). */
  async get(accountId: string | operations.GetAccountRequest, options?: RequestOptions): Promise<WithMeta<models.Account>> {
    const request = typeof accountId === "string" ? { accountId } : accountId;
    const response = await this.inner.get(request, options);
    return withMeta(response.result, response.headers);
  }

  /**
   * Erase the account in your key's environment: every assessment of it,
   * with its evidence and outcomes. Needs the `history` scope. Idempotent: a
   * repeat answers assessmentsDeleted 0. An account.deleted webhook follows
   * when something was deleted.
   */
  async delete(accountId: string | operations.DeleteAccountRequest, options?: RequestOptions): Promise<WithMeta<models.AccountDeletion>> {
    const request = typeof accountId === "string" ? { accountId } : accountId;
    const response = await this.inner.delete(request, options);
    return withMeta(response.result, response.headers);
  }

  /**
   * One page of the account's unexpired assessments, newest first. Iterate
   * the returned page with `for await` to walk every item across pages, or
   * call `page.next()` yourself.
   */
  async listAssessments(accountId: string, options: ListAssessmentsOptions = {}): Promise<AssessmentPage> {
    const { limit, cursor, responseMode, ...rest } = options;
    const request: operations.ListAccountAssessmentsRequest = {
      accountId,
      ...(limit !== undefined ? { limit } : {}),
      ...(cursor !== undefined ? { cursor } : {}),
      ...(responseMode !== undefined ? { responseMode } : {}),
    };
    const page = await this.inner.listAssessments(request, rest);
    return toPage(page);
  }

  /**
   * Accounts whose risk changed since `changedSince` (a previous answer's
   * nextCursor), oldest change first. `unenforced: true` keeps only accounts
   * with no applied enforcement at their current riskVersion. nextCursor is
   * always set: pass it back to poll.
   */
  async listChanged(request: operations.ListAccountsRequest = {}, options?: RequestOptions): Promise<WithMeta<models.AccountList>> {
    const response = await this.inner.listChanged(request, options);
    return withMeta(response.result, response.headers);
  }

  /**
   * Record what you did to the account in your identity provider for one
   * flow's decision at one riskVersion. Kept once per account, riskVersion,
   * flow and action, so a retry is safe; an applied report replaces a failed
   * one. handleRiskChange and enforceAccount call this for you.
   */
  async recordEnforcement(accountId: string, body: models.EnforcementRequest, options?: RequestOptions): Promise<WithMeta<models.Enforcement>> {
    const response = await this.inner.recordEnforcement({ accountId, body }, options);
    return withMeta(response.result, response.headers);
  }
}

/**
 * Usage of the API keys your platform issued to your accounts. Needs the
 * `assess` scope. Most callers use `buffer()`, which batches facts and sends
 * them in the background; `record` sends one batch now.
 */
export class KeyUsage {
  constructor(private readonly inner: GeneratedKeyUsage) {}

  /**
   * Send one batch of 1 to 500 events (at most 256 KiB). The idempotency key
   * is generated when omitted and reused on every retry of this call, so a
   * retried batch is counted once.
   */
  async record(
    request: models.KeyUsageBatchRequest | operations.RecordKeyUsageRequest,
    options: CreateOptions = {},
  ): Promise<WithMeta<models.KeyUsageBatch>> {
    const { idempotencyKey, ...rest } = options;
    const envelope = "body" in request ? request : undefined;
    const generated: operations.RecordKeyUsageRequest = {
      body: envelope ? envelope.body : (request as models.KeyUsageBatchRequest),
      idempotencyKey: envelope?.idempotencyKey ?? idempotencyKey ?? newIdempotencyKey(),
    };
    const response = await this.inner.record(generated, rest);
    return withMeta(response.result, response.headers);
  }

  /** A buffer that sends recorded facts in the background. Keep one per process and close it on shutdown. */
  buffer(options: KeyUsageBufferOptions = {}): KeyUsageBuffer {
    return new KeyUsageBuffer(this, options);
  }
}

export class Keys {
  constructor(private readonly inner: GeneratedKeys) {}

  /** Mint a replacement for the key that signs the request. The old key keeps working for overlapSeconds (default 24 hours). */
  async rotate(request: models.KeyRotationRequest = {}, options?: RequestOptions): Promise<WithMeta<models.KeyRotation>> {
    const response = await this.inner.rotate(request, options);
    return withMeta(response.result, response.headers);
  }

  /**
   * Create a key in the signing key's environment, with scopes the signing
   * key holds. Needs the `management` scope. The secret is in `key`, shown
   * once. Not idempotent, so never retried.
   */
  async create(workspaceId: string, request: models.KeyRequest, options?: RequestOptions): Promise<WithMeta<models.Key>> {
    const response = await this.inner.create({ workspaceId, body: request }, options);
    return withMeta(response.result, response.headers);
  }

  /** The keys of the signing key's environment, newest first, without secrets. Needs the `management` scope. */
  async list(workspaceId: string, options?: RequestOptions): Promise<WithMeta<models.KeyList>> {
    const response = await this.inner.list({ workspaceId }, options);
    return withMeta(response.result, response.headers);
  }

  /** Revoke a key of the signing key's environment at once. A key cannot revoke itself. Needs the `management` scope. */
  async revoke(workspaceId: string, keyId: string, options?: RequestOptions): Promise<WithMeta<models.Key>> {
    const response = await this.inner.revoke({ workspaceId, keyId }, options);
    return withMeta(response.result, response.headers);
  }
}

/**
 * The settings of the signing key's environment: retention, each flow's
 * thresholds, default depth and admission, and the refused sources. Every
 * method needs the `management` scope; the other environment answers 404.
 */
export class Settings {
  constructor(private readonly inner: GeneratedSettings) {}

  /** Read the environment's settings. */
  async get(workspaceId: string, environment: models.KeyEnvironment, options?: RequestOptions): Promise<WithMeta<models.Settings>> {
    const response = await this.inner.get({ workspaceId, environment }, options);
    return withMeta(response.result, response.headers);
  }

  /** Change only what `change` names, in one transaction. */
  async update(
    workspaceId: string,
    environment: models.KeyEnvironment,
    change: models.SettingsRequest,
    options?: RequestOptions,
  ): Promise<WithMeta<models.Settings>> {
    const response = await this.inner.update({ workspaceId, environment, body: change }, options);
    return withMeta(response.result, response.headers);
  }
}

/**
 * Your webhook endpoints. create and rotateSigningKey return a signing secret
 * that is shown only in that answer; none of create, rotateSigningKey,
 * sendTestEvent and replayDelivery is retried, since a retry would register,
 * issue or send again.
 */
export class WebhookEndpoints {
  constructor(private readonly inner: GeneratedWebhookEndpoints) {}

  /** Register an endpoint. It starts unverified; send endpoint.verification with sendTestEvent. */
  async create(request: models.WebhookEndpointRequest, options?: RequestOptions): Promise<WithMeta<models.WebhookEndpointCreated>> {
    const response = await this.inner.create(request, options);
    return withMeta(response.result, response.headers);
  }

  /** Every endpoint you hold, in every state, with its signing key ids. */
  async list(options?: RequestOptions): Promise<WithMeta<models.WebhookEndpointList>> {
    const response = await this.inner.list(options);
    return withMeta(response.result, response.headers);
  }

  /** Delete an endpoint and its keys; deliveries still queued for it are dropped. */
  async delete(endpointId: string, options?: RequestOptions): Promise<ResponseMeta> {
    const response = await this.inner.delete({ endpointId }, options);
    return toMeta(response?.headers ?? {});
  }

  /** Issue a new signing key. The previous one keeps verifying for 7 days. */
  async rotateSigningKey(endpointId: string, options?: RequestOptions): Promise<WithMeta<models.WebhookKeyRotation>> {
    const response = await this.inner.rotateSigningKey({ endpointId, body: {} }, options);
    return withMeta(response.result, response.headers);
  }

  /**
   * Send endpoint.verification now (the answer says whether the endpoint
   * echoed it), or queue an assessment.updated test event with test: true.
   */
  async sendTestEvent(
    endpointId: string,
    event: models.WebhookTestRequestEvent,
    options?: RequestOptions,
  ): Promise<WithMeta<models.WebhookTest>> {
    const response = await this.inner.sendTestEvent({ endpointId, body: { event } }, options);
    return withMeta(response.result, response.headers);
  }

  /**
   * One page of the endpoint's delivery attempts, newest first: the event,
   * the attempt number, delivered or failed, the response code, the failure
   * reason and the latency. Kept for 30 days, or your retention when shorter.
   */
  async listDeliveries(endpointId: string, options: ListDeliveriesOptions = {}): Promise<DeliveryPage> {
    const { limit, cursor, ...rest } = options;
    const request: operations.ListWebhookDeliveriesRequest = {
      endpointId,
      ...(limit !== undefined ? { limit } : {}),
      ...(cursor !== undefined ? { cursor } : {}),
    };
    const page = await this.inner.listDeliveries(request, rest);
    return toDeliveryPage(page);
  }

  /**
   * Send one logged event to the endpoint again: the same event id and body,
   * a fresh timestamp and signature. The endpoint must be verified.
   */
  async replayDelivery(endpointId: string, eventId: string, options?: RequestOptions): Promise<WithMeta<models.WebhookReplay>> {
    const response = await this.inner.replayDelivery({ endpointId, eventId, body: {} }, options);
    return withMeta(response.result, response.headers);
  }
}

/**
 * Hosted provider integrations: a WorkOS or Auth0 Action that NoResponse
 * answers, so sign-ups and sign-ins are scored with no server of your own.
 * Every method needs the `integrations` scope. create and rotate are not
 * idempotent and are never retried.
 */
export class Integrations {
  constructor(private readonly inner: GeneratedIntegrations) {}

  /** Register a WorkOS or Auth0 integration. For Auth0, `secret` is the Action's shared secret, shown once. */
  async create(request: models.IntegrationRequest, options?: RequestOptions): Promise<WithMeta<models.Integration>> {
    const response = await this.inner.create(request, options);
    return withMeta(response.result, response.headers);
  }

  /** Every integration, oldest first. Listings carry no secrets. */
  async list(options?: RequestOptions): Promise<WithMeta<models.IntegrationList>> {
    const response = await this.inner.list(options);
    return withMeta(response.result, response.headers);
  }

  /** Delete an integration; its endpoint answers 404 from then on. */
  async delete(
    integrationId: string | operations.DeleteIntegrationRequest,
    options?: RequestOptions,
  ): Promise<{ meta: ResponseMeta }> {
    const request = typeof integrationId === "string" ? { integrationId } : integrationId;
    const response = await this.inner.delete(request, options);
    return { meta: toMeta(response?.headers ?? {}) };
  }

  /**
   * Replace an integration's secret. For Auth0 send nothing and read the new
   * `secret`, shown once; for WorkOS send the regenerated `signingSecret`. The
   * replaced secret is accepted until `previousSecretExpiresAt`.
   */
  rotate(
    integrationId: string,
    request?: models.IntegrationRotationRequest,
    options?: RequestOptions,
  ): Promise<WithMeta<models.Integration>>;
  rotate(request: operations.RotateIntegrationSecretRequest, options?: RequestOptions): Promise<WithMeta<models.Integration>>;
  async rotate(
    first: string | operations.RotateIntegrationSecretRequest,
    second?: models.IntegrationRotationRequest | RequestOptions,
    third?: RequestOptions,
  ): Promise<WithMeta<models.Integration>> {
    const [request, options] =
      typeof first === "string"
        ? [{ integrationId: first, body: (second as models.IntegrationRotationRequest | undefined) ?? {} }, third]
        : [first, second as RequestOptions | undefined];
    const response = await this.inner.rotate(request, options);
    return withMeta(response.result, response.headers);
  }
}

const webhooks = { constructEvent } as const;

export class NoResponse {
  static readonly webhooks = webhooks;
  readonly webhooks = webhooks;
  readonly assessments: Assessments;
  readonly accounts: Accounts;
  readonly keys: Keys;
  readonly settings: Settings;
  readonly keyUsage: KeyUsage;
  readonly webhookEndpoints: WebhookEndpoints;
  readonly integrations: Integrations;
  /** The generated client, for the standalone functions under `@noresponse/node/funcs/*`. */
  readonly core: NoResponseCore;
  readonly baseUrl: string;

  /** `new NoResponse()` reads NORESPONSE_API_KEY; `new NoResponse("nrk_...")` takes the key directly. */
  constructor(options: NoResponseOptions | string = {}) {
    const sdkOptions = toSDKOptions(typeof options === "string" ? { apiKey: options } : options);
    const client = new GeneratedClient(sdkOptions);
    this.baseUrl = sdkOptions.serverURL!;
    this.assessments = new Assessments(client.assessments);
    this.accounts = new Accounts(client.accounts);
    this.keys = new Keys(client.keys);
    this.settings = new Settings(client.settings);
    this.keyUsage = new KeyUsage(client.keyUsage);
    this.webhookEndpoints = new WebhookEndpoints(client.webhookEndpoints);
    this.integrations = new Integrations(client.integrations);
    this.core = client;
    // Keep the key out of console.log(nr) and JSON.stringify(nr).
    Object.defineProperty(this, "core", { value: client, enumerable: false, writable: false });
  }

  toJSON(): { baseUrl: string } {
    return { baseUrl: this.baseUrl };
  }

  [Symbol.for("nodejs.util.inspect.custom")](): string {
    return `NoResponse { baseUrl: '${this.baseUrl}' }`;
  }
}
