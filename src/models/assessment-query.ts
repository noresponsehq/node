import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { ResponseMode, ResponseMode$outboundSchema } from "./response-mode.js";

/**
 * POST /v1/assessments/query body. account_id travels in the body rather than the URL path so a provider value that turns out to hold personal data is not written to access logs, proxies or browser history. Read-only: no Idempotency-Key. An account with no unexpired assessments answers 200 with empty items.
 */
export type AssessmentQuery = {
  /**
   * Your own opaque identifier for the account being checked, scoped to your tenant. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused, as is a JWT; a hex digest such as a SHA-256 is allowed. It travels only in request bodies. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  limit?: number | undefined;
  /**
   * next_cursor from the previous page, unchanged. Opaque, MAC'd and bound to the tenant and account_id.
   */
  cursor?: string | undefined;
  /**
   * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
   */
  responseMode?: ResponseMode | undefined;
};

/** @internal */
export type AssessmentQuery$Outbound = {
  account_id: string;
  limit: number;
  cursor?: string | undefined;
  response_mode?: string | undefined;
};

/** @internal */
export const AssessmentQuery$outboundSchema: z.ZodMiniType<
  AssessmentQuery$Outbound,
  AssessmentQuery
> = z.pipe(
  z.object({
    accountId: z.string(),
    limit: z._default(z.int(), 20),
    cursor: z.optional(z.string()),
    responseMode: z.optional(ResponseMode$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      responseMode: "response_mode",
    });
  }),
);

export function assessmentQueryToJSON(
  assessmentQuery: AssessmentQuery,
): string {
  return JSON.stringify(AssessmentQuery$outboundSchema.parse(assessmentQuery));
}
