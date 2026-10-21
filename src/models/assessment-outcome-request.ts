import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Outcome, Outcome$outboundSchema } from "./outcome.js";

/**
 * POST /v1/assessments/{assessment_id}/outcomes body: what the provider later learned about the account it assessed. The assessment is named by the path and the tenant by the API key, so neither is a body member. Idempotency-Key is required and binds the body as it does on POST /v1/assessments.
 */
export type AssessmentOutcomeRequest = {
  /**
   * What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this tenant for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.
   */
  outcome: Outcome;
  /**
   * When the provider observed the outcome. Defaults to when NoResponse received it.
   */
  observedAt?: string | undefined;
  /**
   * Your own opaque reference for the outcome, such as a case or ticket id. Stored as given and not interpreted; keep direct identifiers out of it.
   */
  externalRef?: string | undefined;
  /**
   * Free text for your own records, at most 500 characters. Stored only; it is left out of scoring and answers. Keep personal data out of it. Control characters other than tab and line breaks are refused.
   */
  notes?: string | undefined;
};

/** @internal */
export type AssessmentOutcomeRequest$Outbound = {
  outcome: string;
  observed_at?: string | undefined;
  external_ref?: string | undefined;
  notes?: string | undefined;
};

/** @internal */
export const AssessmentOutcomeRequest$outboundSchema: z.ZodMiniType<
  AssessmentOutcomeRequest$Outbound,
  AssessmentOutcomeRequest
> = z.pipe(
  z.object({
    outcome: Outcome$outboundSchema,
    observedAt: z.optional(z.string()),
    externalRef: z.optional(z.string()),
    notes: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      observedAt: "observed_at",
      externalRef: "external_ref",
    });
  }),
);

export function assessmentOutcomeRequestToJSON(
  assessmentOutcomeRequest: AssessmentOutcomeRequest,
): string {
  return JSON.stringify(
    AssessmentOutcomeRequest$outboundSchema.parse(assessmentOutcomeRequest),
  );
}
