import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  AssessmentRequestClientContext,
  AssessmentRequestClientContext$Outbound,
  AssessmentRequestClientContext$outboundSchema,
} from "./assessment-request-client-context.js";
import {
  AssessmentRequestIdentifiers,
  AssessmentRequestIdentifiers$Outbound,
  AssessmentRequestIdentifiers$outboundSchema,
} from "./assessment-request-identifiers.js";
import {
  AssessmentRequestPolicyContext,
  AssessmentRequestPolicyContext$Outbound,
  AssessmentRequestPolicyContext$outboundSchema,
} from "./assessment-request-policy-context.js";
import {
  AuthContext,
  AuthContext$Outbound,
  AuthContext$outboundSchema,
} from "./auth-context.js";
import { ResponseMode, ResponseMode$outboundSchema } from "./response-mode.js";

/**
 * POST /v1/assessments body. At least one of email, username or phone is required; name and ip only refine an assessment. No field carries a password, hash, token or breach value, and unknown members are refused. The email local part is kept as received and only the domain is lower-cased; the username is compared case-insensitively; the phone is strict E.164 and is assessed asynchronously. The whole body is capped at 32768 bytes. client_context holds bounded hints from the signup client; auth_context holds normalised claims from a session your backend has verified. Raw tokens are refused.
 */
export type AssessmentRequest = {
  /**
   * Your own opaque identifier for the account being checked, scoped to your tenant. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused, as is a JWT; a hex digest such as a SHA-256 is allowed. It travels only in request bodies.
   */
  accountId: string;
  /**
   * At least one of email, username or phone. name and ip refine the match and travel beside a lookup identifier; a body with only name or ip is refused with 400.
   */
  identifiers: AssessmentRequestIdentifiers;
  policyContext?: AssessmentRequestPolicyContext | undefined;
  /**
   * An optional provider correlation id, echoed back. It is not an idempotency key. Refuses an exact-shape JWT or a bare 40, 64 or 128 character hex digest; a UUID is accepted.
   */
  requestId?: string | undefined;
  /**
   * Optional tighter budget, 50 to 500 ms, measured from the moment the request reaches NoResponse. Absent means the 500 ms ceiling; a value above it is refused with 400 rather than clamped.
   */
  deadlineMs?: number | undefined;
  /**
   * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
   */
  responseMode?: ResponseMode | undefined;
  /**
   * Optional context observed by your signup client. The server parses these hints into coarse features, leaves raw user_agent and opaque ids out of every answer, and weighs a mismatch with the other evidence.
   */
  clientContext?: AssessmentRequestClientContext | undefined;
  /**
   * Normalised claims from a session your backend has already verified with WorkOS, Clerk, Auth0 or any OIDC provider. Pass the output of the SDK's auth adapters, not a raw token.
   */
  authContext?: AuthContext | undefined;
};

/** @internal */
export type AssessmentRequest$Outbound = {
  account_id: string;
  identifiers: AssessmentRequestIdentifiers$Outbound;
  policy_context?: AssessmentRequestPolicyContext$Outbound | undefined;
  request_id?: string | undefined;
  deadline_ms?: number | undefined;
  response_mode?: string | undefined;
  client_context?: AssessmentRequestClientContext$Outbound | undefined;
  auth_context?: AuthContext$Outbound | undefined;
};

/** @internal */
export const AssessmentRequest$outboundSchema: z.ZodMiniType<
  AssessmentRequest$Outbound,
  AssessmentRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
    identifiers: AssessmentRequestIdentifiers$outboundSchema,
    policyContext: z.optional(AssessmentRequestPolicyContext$outboundSchema),
    requestId: z.optional(z.string()),
    deadlineMs: z.optional(z.int()),
    responseMode: z.optional(ResponseMode$outboundSchema),
    clientContext: z.optional(AssessmentRequestClientContext$outboundSchema),
    authContext: z.optional(AuthContext$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      policyContext: "policy_context",
      requestId: "request_id",
      deadlineMs: "deadline_ms",
      responseMode: "response_mode",
      clientContext: "client_context",
      authContext: "auth_context",
    });
  }),
);

export function assessmentRequestToJSON(
  assessmentRequest: AssessmentRequest,
): string {
  return JSON.stringify(
    AssessmentRequest$outboundSchema.parse(assessmentRequest),
  );
}
