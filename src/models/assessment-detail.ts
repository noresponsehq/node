import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AssessmentDetailAuthContext,
  AssessmentDetailAuthContext$inboundSchema,
  AssessmentDetailAuthContext$Outbound,
  AssessmentDetailAuthContext$outboundSchema,
} from "./assessment-detail-auth-context.js";
import {
  AssessmentDetailTiming,
  AssessmentDetailTiming$inboundSchema,
  AssessmentDetailTiming$Outbound,
  AssessmentDetailTiming$outboundSchema,
} from "./assessment-detail-timing.js";
import {
  Confidence,
  Confidence$inboundSchema,
  Confidence$outboundSchema,
} from "./confidence.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  IncompleteSource,
  IncompleteSource$inboundSchema,
  IncompleteSource$Outbound,
  IncompleteSource$outboundSchema,
} from "./incomplete-source.js";
import {
  Recommendation,
  Recommendation$inboundSchema,
  Recommendation$outboundSchema,
} from "./recommendation.js";
import {
  Risk,
  Risk$inboundSchema,
  Risk$Outbound,
  Risk$outboundSchema,
} from "./risk.js";
import {
  Signal,
  Signal$inboundSchema,
  Signal$Outbound,
  Signal$outboundSchema,
} from "./signal.js";
import {
  Status,
  Status$inboundSchema,
  Status$outboundSchema,
} from "./status.js";

/**
 * One assessment's own facts: its score and recommendation, the signals behind them, the lanes still running and its timing. risk here is this assessment's own score; the account's current risk is the account member of the assessment. risk and recommendation are present for complete and partial; assessment_url is present for pending.
 */
export type AssessmentDetail = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  /**
   * Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.
   */
  assessmentId: string;
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  /**
   * An optional provider correlation id, echoed back. It is not an idempotency key. Refuses an exact-shape JWT or a bare 40, 64 or 128 character hex digest; a UUID is accepted.
   */
  requestId?: string | undefined;
  /**
   * complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.
   */
  status: Status;
  /**
   * The recommended action: allow, step_up or review. Your application applies it.
   */
  recommendation?: Recommendation | undefined;
  /**
   * Ordinal confidence in the recommendation under the current policy: low, medium, high or unavailable.
   */
  confidence: Confidence;
  /**
   * The one risk decision for this event. score is 0 (safe) to 100 (risky): the sum of the weights of the reasons that fired, clamped to 0 to 100, from hand-set versioned weights. Every answer with a recommendation carries it, and the top-level recommendation equals risk.recommendation. It names no source or provider.
   */
  risk?: Risk | undefined;
  /**
   * Detailed view only (response_mode=detailed, which needs the detailed scope): a standard answer omits signals[], and a detailed one always carries it, possibly empty. The body does not name its mode, so that rule is the serving gate's; the schema states the half it can: an answer with risk.details is a detailed view and carries signals[]. At most one signal per (type, source_id, identifier).
   */
  signals?: Array<Signal> | undefined;
  /**
   * The lanes that did not settle, each listed once with a reason; lanes, not sources. In a detailed view a lane is listed exactly when one of its signals did not settle; a standard view carries no signals to match.
   */
  incompleteSources: Array<IncompleteSource>;
  /**
   * Version of the hand-authored heuristic weights that produced the recommendation, for example 'risk-2026-10.7'. A workspace threshold override adds a +t<N> suffix, e.g. 'risk-2026-10.7+t3'.
   */
  policyVersion: string;
  /**
   * Labels the v0 policy as hand-authored and not statistically validated.
   */
  policyBasis: "heuristic_unvalidated";
  /**
   * Monotonic revision of this assessment. 1 on the synchronous answer; each material change while the assessment is served (an async continuation settling a source, a change of recommendation, confidence or status) increments it. Expiry does not increment it: an expired assessment is gone, not revised, and the expiry webhook carries the last served version.
   */
  assessmentVersion: number;
  /**
   * When the assessment was created. Fixed for the life of the assessment: every revision carries the same created_at.
   */
  createdAt: string;
  updatedAt: string;
  /**
   * After this instant the assessment is no longer served: GET /v1/assessments/{assessment_id} answers 404 and it leaves the account history. It is created_at plus your retention period at creation (default and maximum 365 days) and is fixed per record: a later revision keeps it, and a new assessment for the same account starts its own clock. If you later shorten retention, the effective expiry becomes created_at plus the shorter of the two periods.
   */
  expiresAt: string;
  /**
   * Server-relative path of the authoritative assessment, GET /v1/assessments/{assessment_id}.
   */
  assessmentUrl?: string | undefined;
  timing: AssessmentDetailTiming;
  /**
   * The identity fields of the auth context the assessment was made with, echoed for the workspace's own correlation: the request's auth_context, or the one a hosted provider hook (POST /hooks/{integration_id}) built, with transport provider_hook and its hook_point. Present exactly when the request carried an auth_context, and the same on every revision of the assessment. Values are as the request or the hook sent them; tokens, timestamps, roles and scopes are not echoed, and the echo does not change the score.
   */
  authContext?: AssessmentDetailAuthContext | undefined;
};

/** @internal */
export const AssessmentDetail$inboundSchema: z.ZodMiniType<
  AssessmentDetail,
  unknown
> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    assessment_id: types.string(),
    account_id: types.string(),
    request_id: types.optional(types.string()),
    status: Status$inboundSchema,
    recommendation: types.optional(Recommendation$inboundSchema),
    confidence: Confidence$inboundSchema,
    risk: types.optional(Risk$inboundSchema),
    signals: types.optional(z.array(Signal$inboundSchema)),
    incomplete_sources: z.array(IncompleteSource$inboundSchema),
    policy_version: types.string(),
    policy_basis: types.literal("heuristic_unvalidated"),
    assessment_version: types.number(),
    created_at: types.string(),
    updated_at: types.string(),
    expires_at: types.string(),
    assessment_url: types.optional(types.string()),
    timing: AssessmentDetailTiming$inboundSchema,
    auth_context: types.optional(AssessmentDetailAuthContext$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "assessment_id": "assessmentId",
      "account_id": "accountId",
      "request_id": "requestId",
      "incomplete_sources": "incompleteSources",
      "policy_version": "policyVersion",
      "policy_basis": "policyBasis",
      "assessment_version": "assessmentVersion",
      "created_at": "createdAt",
      "updated_at": "updatedAt",
      "expires_at": "expiresAt",
      "assessment_url": "assessmentUrl",
      "auth_context": "authContext",
    });
  }),
);
/** @internal */
export type AssessmentDetail$Outbound = {
  schema_version: "1";
  assessment_id: string;
  account_id: string;
  request_id?: string | undefined;
  status: string;
  recommendation?: string | undefined;
  confidence: string;
  risk?: Risk$Outbound | undefined;
  signals?: Array<Signal$Outbound> | undefined;
  incomplete_sources: Array<IncompleteSource$Outbound>;
  policy_version: string;
  policy_basis: "heuristic_unvalidated";
  assessment_version: number;
  created_at: string;
  updated_at: string;
  expires_at: string;
  assessment_url?: string | undefined;
  timing: AssessmentDetailTiming$Outbound;
  auth_context?: AssessmentDetailAuthContext$Outbound | undefined;
};

/** @internal */
export const AssessmentDetail$outboundSchema: z.ZodMiniType<
  AssessmentDetail$Outbound,
  AssessmentDetail
> = z.pipe(
  z.object({
    schemaVersion: z.literal("1"),
    assessmentId: z.string(),
    accountId: z.string(),
    requestId: z.optional(z.string()),
    status: Status$outboundSchema,
    recommendation: z.optional(Recommendation$outboundSchema),
    confidence: Confidence$outboundSchema,
    risk: z.optional(Risk$outboundSchema),
    signals: z.optional(z.array(Signal$outboundSchema)),
    incompleteSources: z.array(IncompleteSource$outboundSchema),
    policyVersion: z.string(),
    policyBasis: z.literal("heuristic_unvalidated"),
    assessmentVersion: z.int(),
    createdAt: z.string(),
    updatedAt: z.string(),
    expiresAt: z.string(),
    assessmentUrl: z.optional(z.string()),
    timing: AssessmentDetailTiming$outboundSchema,
    authContext: z.optional(AssessmentDetailAuthContext$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      schemaVersion: "schema_version",
      assessmentId: "assessment_id",
      accountId: "account_id",
      requestId: "request_id",
      incompleteSources: "incomplete_sources",
      policyVersion: "policy_version",
      policyBasis: "policy_basis",
      assessmentVersion: "assessment_version",
      createdAt: "created_at",
      updatedAt: "updated_at",
      expiresAt: "expires_at",
      assessmentUrl: "assessment_url",
      authContext: "auth_context",
    });
  }),
);

export function assessmentDetailToJSON(
  assessmentDetail: AssessmentDetail,
): string {
  return JSON.stringify(
    AssessmentDetail$outboundSchema.parse(assessmentDetail),
  );
}
export function assessmentDetailFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentDetail, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentDetail$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentDetail' from JSON`,
  );
}
