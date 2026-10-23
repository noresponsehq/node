/**
 * Webhook verification. Hand-written; not generated. Needs Node.js (node:crypto).
 *
 * Verify the exact bytes received: the signature is HMAC-SHA256 over
 * "<timestamp>.<raw body>", so re-serialising parsed JSON breaks it.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import * as z from "zod/v4-mini";
import { Account$inboundSchema, type Account } from "./models/account.js";
import { AccountDecisionsByFlow$inboundSchema, type AccountDecisionsByFlow } from "./models/account-decisions-by-flow.js";
import { Assessment$inboundSchema, type Assessment } from "./models/assessment.js";

export const DEFAULT_TOLERANCE_SECONDS = 300;

const REQUIRED = ["nr-webhook-id", "nr-webhook-timestamp", "nr-webhook-key-id", "nr-webhook-signature"] as const;
const KEY_ID = /^whk_[A-Za-z0-9]{8,64}$/;
const SIGNATURE = /^v1=[0-9a-f]{64}$/;
const TIMESTAMP = /^[0-9]{1,12}$/;
const CHALLENGE = /^[A-Za-z0-9_-]{43}$/;
const EVENT_ID = /^evt_[0-9A-HJKMNP-TV-Z]{26}$/;
const ASSESSMENT_ID = /^asm_[0-9A-HJKMNP-TV-Z]{26}$/;
const ACCOUNT_ID = /^[A-Za-z0-9][A-Za-z0-9._:|-]{0,127}$/;
const ENDPOINT_ID = /^whe_[0-9A-HJKMNP-TV-Z]{26}$/;
const WORKSPACE_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,122}$/;
const DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

/** Any case-insensitive mapping of header name to value: Fetch Headers, Node IncomingHttpHeaders, a plain object or entries. */
export type HeaderInput =
  | Headers
  | Iterable<readonly [string, string]>
  | Readonly<Record<string, string | string[] | undefined>>;

/** Webhook key id (whk_...) to its secret. Hold both during a rotation. */
export type WebhookSecrets = Readonly<Record<string, string | Uint8Array>>;

export type ConstructEventOptions = {
  /** How far the NR-Webhook-Timestamp may be from now, in seconds. Default 300. */
  toleranceSeconds?: number;
  /** The receiver's clock in Unix seconds; defaults to now. */
  now?: number;
};

/** The final event for an assessment: it has expired and GET now answers 404. */
export type AssessmentExpired = {
  assessmentId: string;
  accountId: string;
  /** The last served version; expiry is not a revision. */
  assessmentVersion: number;
  status: "expired";
  changeReason: "expired";
};

export type EndpointVerification = {
  endpointId: string;
  challenge: string;
};

/** An account you erased with accounts.delete: delete what you hold for it. */
export type AccountDeleted = {
  accountId: string;
  /** How many assessments the erasure deleted, at least 1. */
  assessmentsDeleted: number;
  /** When the erasure took effect, as deletedAt in the accounts.delete answer. */
  deletedAt: string;
};

/**
 * The workspace was deleted. Sent once per environment before its endpoints
 * are torn down: the last event this endpoint receives.
 */
export type WorkspaceDeleted = {
  workspaceId: string;
  environment: "live" | "test";
  deletedAt: string;
};

/**
 * Another endpoint of this environment was disabled after failing
 * continuously for 72 hours. It receives nothing more until it is verified again.
 */
export type EndpointDisabled = {
  endpointId: string;
  /** When its deliveries started failing. */
  failingSince: string;
  disabledAt: string;
};

/**
 * The account's decision for at least one flow changed. It is not sent when
 * the score moves within the same decision, nor for an account's first risk.
 */
export type AccountRiskChanged = {
  /** The account exactly as accounts.get returns it: the new risk and decisions. */
  account: Account;
  /** The decision for each flow before the change, as last announced. */
  previousDecisionsByFlow: AccountDecisionsByFlow;
};

export type AssessmentUpdatedEvent = {
  id: string;
  type: "assessment.updated";
  createdAt: string;
  /**
   * True on an event sent by webhookEndpoints.sendTestEvent: data is a fixed
   * example assessment, not one of yours. Acknowledge it and apply nothing.
   * False on every real event.
   */
  test: boolean;
  /** The assessment exactly as assessments.get returns it at this version. */
  data: Assessment;
};

export type AssessmentExpiredEvent = {
  id: string;
  type: "assessment.updated";
  createdAt: string;
  /** Always false: an expiry is never a test event. */
  test: false;
  data: AssessmentExpired;
};

export type EndpointVerificationEvent = {
  id: string;
  type: "endpoint.verification";
  createdAt: string;
  /** Always false. */
  test: false;
  data: EndpointVerification;
};

export type AccountDeletedEvent = {
  id: string;
  type: "account.deleted";
  createdAt: string;
  /** Always false. */
  test: false;
  data: AccountDeleted;
};

export type WorkspaceDeletedEvent = {
  id: string;
  type: "workspace.deleted";
  createdAt: string;
  /** Always false. */
  test: false;
  data: WorkspaceDeleted;
};

export type EndpointDisabledEvent = {
  id: string;
  type: "webhook_endpoint.disabled";
  createdAt: string;
  /** Always false. */
  test: false;
  data: EndpointDisabled;
};

export type AccountRiskChangedEvent = {
  id: string;
  type: "account.risk_changed";
  createdAt: string;
  /** Always false. */
  test: false;
  data: AccountRiskChanged;
};

export type WebhookEvent =
  | AssessmentUpdatedEvent
  | AssessmentExpiredEvent
  | EndpointVerificationEvent
  | AccountDeletedEvent
  | WorkspaceDeletedEvent
  | EndpointDisabledEvent
  | AccountRiskChangedEvent;

export type WebhookErrorCode =
  | "missing_header"
  | "duplicate_header"
  | "invalid_timestamp"
  | "unknown_key"
  | "invalid_signature"
  | "invalid_payload";

/** Thrown by constructEvent and verificationResponse. Answer 400 and do not process the delivery. */
export class WebhookVerificationError extends Error {
  readonly code: WebhookErrorCode;
  constructor(code: WebhookErrorCode, message: string) {
    super(message);
    this.name = "WebhookVerificationError";
    this.code = code;
  }
}

function fail(code: WebhookErrorCode, message: string): never {
  throw new WebhookVerificationError(code, message);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validDateTime(value: string): boolean {
  return DATETIME.test(value) && !Number.isNaN(Date.parse(value));
}

function entriesOf(headers: HeaderInput): Array<readonly [string, string | string[] | undefined]> {
  if (typeof Headers !== "undefined" && headers instanceof Headers) return [...headers.entries()];
  if (typeof (headers as Iterable<unknown>)[Symbol.iterator] === "function") {
    return [...(headers as Iterable<readonly [string, string]>)];
  }
  return Object.entries(headers as Record<string, string | string[] | undefined>);
}

function collect(headers: HeaderInput): Map<string, string> {
  const found = new Map<string, string>();
  for (const [name, raw] of entriesOf(headers)) {
    const key = name.toLowerCase();
    if (!(REQUIRED as readonly string[]).includes(key)) continue;
    if (Array.isArray(raw)) {
      if (raw.length !== 1) fail("duplicate_header", `Webhook header ${key} is repeated`);
    }
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (found.has(key)) fail("duplicate_header", `Webhook header ${key} is repeated`);
    if (typeof value === "string") found.set(key, value);
  }
  for (const name of REQUIRED) {
    if (!found.get(name)) fail("missing_header", `Webhook header ${name} is missing`);
  }
  return found;
}

function expired(data: Record<string, unknown>): AssessmentExpired {
  const { assessment_id, account_id, assessment_version, change_reason } = data;
  if (
    typeof assessment_id !== "string" || !ASSESSMENT_ID.test(assessment_id) ||
    typeof account_id !== "string" || !ACCOUNT_ID.test(account_id) ||
    typeof assessment_version !== "number" || !Number.isInteger(assessment_version) || assessment_version < 1 ||
    change_reason !== "expired"
  ) {
    fail("invalid_payload", "Expired assessment event is malformed");
  }
  return { assessmentId: assessment_id, accountId: account_id, assessmentVersion: assessment_version, status: "expired", changeReason: "expired" };
}

/**
 * Verify a delivery and return the typed event.
 *
 * `payload` is the raw request body (bytes, or the exact text). `headers` is
 * any case-insensitive header mapping; a repeated signature header, in any
 * letter case, is refused. `secrets` maps each whk_ key id NoResponse gave you
 * to its secret, so two can be held during a rotation. Deliveries older than
 * `toleranceSeconds` (default 300) are refused; deduplicate on `event.id`
 * and keep the highest `data.detail.assessmentVersion` yourself.
 */
export function constructEvent(
  payload: Uint8Array | string,
  headers: HeaderInput,
  secrets: WebhookSecrets,
  options: ConstructEventOptions = {},
): WebhookEvent {
  const raw = typeof payload === "string" ? Buffer.from(payload, "utf8") : Buffer.from(payload.buffer, payload.byteOffset, payload.byteLength);
  const tolerance = options.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS;
  const now = options.now ?? Math.floor(Date.now() / 1000);
  const found = collect(headers);
  const timestamp = found.get("nr-webhook-timestamp")!;
  if (!TIMESTAMP.test(timestamp) || Math.abs(now - Number(timestamp)) > tolerance) {
    fail("invalid_timestamp", "Webhook timestamp is outside the replay window");
  }
  const keyId = found.get("nr-webhook-key-id")!;
  if (!KEY_ID.test(keyId) || !Object.prototype.hasOwnProperty.call(secrets, keyId)) {
    fail("unknown_key", "Webhook key id is not one this receiver holds");
  }
  const signature = found.get("nr-webhook-signature")!;
  if (!SIGNATURE.test(signature)) fail("invalid_signature", "Webhook signature is malformed");
  const expected = createHmac("sha256", secrets[keyId]!).update(timestamp).update(".").update(raw).digest();
  if (!timingSafeEqual(expected, Buffer.from(signature.slice(3), "hex"))) {
    fail("invalid_signature", "Webhook signature does not match");
  }
  let body: unknown;
  try {
    body = JSON.parse(raw.toString("utf8"));
  } catch {
    fail("invalid_payload", "Webhook body is not JSON");
  }
  if (!isRecord(body) || body["id"] !== found.get("nr-webhook-id")) {
    fail("invalid_payload", "Webhook event id does not match NR-Webhook-Id");
  }
  const { id, type, created_at, data, test } = body;
  if (typeof id !== "string" || !EVENT_ID.test(id) || typeof created_at !== "string" || !validDateTime(created_at) || !isRecord(data)) {
    fail("invalid_payload", "Webhook event envelope is malformed");
  }
  if (type === "endpoint.verification") {
    const { endpoint_id, challenge } = data;
    if (typeof endpoint_id !== "string" || !ENDPOINT_ID.test(endpoint_id) || typeof challenge !== "string" || !CHALLENGE.test(challenge)) {
      fail("invalid_payload", "Endpoint verification event is malformed");
    }
    return { id, type, createdAt: created_at, test: false, data: { endpointId: endpoint_id, challenge } };
  }
  if (type === "account.deleted") {
    const { account_id, assessments_deleted, deleted_at } = data;
    if (
      typeof account_id !== "string" || !ACCOUNT_ID.test(account_id) ||
      typeof assessments_deleted !== "number" || !Number.isInteger(assessments_deleted) || assessments_deleted < 1 ||
      typeof deleted_at !== "string" || !validDateTime(deleted_at)
    ) {
      fail("invalid_payload", "Account deleted event is malformed");
    }
    return { id, type, createdAt: created_at, test: false, data: { accountId: account_id, assessmentsDeleted: assessments_deleted, deletedAt: deleted_at } };
  }
  if (type === "workspace.deleted") {
    const { workspace_id, environment, deleted_at } = data;
    if (
      typeof workspace_id !== "string" || !WORKSPACE_ID.test(workspace_id) ||
      (environment !== "live" && environment !== "test") ||
      typeof deleted_at !== "string" || !validDateTime(deleted_at)
    ) {
      fail("invalid_payload", "Workspace deleted event is malformed");
    }
    return { id, type, createdAt: created_at, test: false, data: { workspaceId: workspace_id, environment, deletedAt: deleted_at } };
  }
  if (type === "webhook_endpoint.disabled") {
    const { endpoint_id, failing_since, disabled_at } = data;
    if (
      typeof endpoint_id !== "string" || !ENDPOINT_ID.test(endpoint_id) ||
      typeof failing_since !== "string" || !validDateTime(failing_since) ||
      typeof disabled_at !== "string" || !validDateTime(disabled_at)
    ) {
      fail("invalid_payload", "Endpoint disabled event is malformed");
    }
    return { id, type, createdAt: created_at, test: false, data: { endpointId: endpoint_id, failingSince: failing_since, disabledAt: disabled_at } };
  }
  if (type === "account.risk_changed") {
    const account = z.safeParse(Account$inboundSchema, data["account"]);
    const previous = z.safeParse(AccountDecisionsByFlow$inboundSchema, data["previous_decisions_by_flow"]);
    if (!account.success || !previous.success || !ACCOUNT_ID.test(account.data.id)) {
      fail("invalid_payload", "Account risk changed event is malformed");
    }
    return { id, type, createdAt: created_at, test: false, data: { account: account.data, previousDecisionsByFlow: previous.data } };
  }
  if (type !== "assessment.updated") fail("invalid_payload", "Unknown webhook event type");
  if (data["status"] === "expired") {
    return { id, type, createdAt: created_at, test: false, data: expired(data) };
  }
  const result = z.safeParse(Assessment$inboundSchema, data);
  if (!result.success) fail("invalid_payload", "Webhook data is not an assessment");
  return { id, type, createdAt: created_at, test: test === true, data: result.data };
}

/** The body to answer an endpoint.verification event with, as JSON, status 200. */
export function verificationResponse(event: WebhookEvent): { challenge: string } {
  if (event.type !== "endpoint.verification") {
    fail("invalid_payload", "Not an endpoint.verification event");
  }
  return { challenge: event.data.challenge };
}

/** True for the terminal expiry event. Delete what you hold for the assessment and fetch nothing. */
export function isExpiredEvent(event: WebhookEvent): event is AssessmentExpiredEvent {
  return event.type === "assessment.updated" && event.data.status === "expired";
}
