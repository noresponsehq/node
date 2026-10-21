import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Outcome, Outcome$inboundSchema } from "./outcome.js";

/**
 * The 202 answer of POST /v1/assessments/{assessment_id}/outcomes. A replay with the same Idempotency-Key and body answers the same record.
 */
export type AssessmentOutcome = {
  /**
   * Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the tenant.
   */
  id: string;
  /**
   * Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the tenant; another tenant's assessment id answers 404.
   */
  assessmentId: string;
  /**
   * What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this tenant for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.
   */
  outcome: Outcome;
  /**
   * When NoResponse first recorded the outcome.
   */
  receivedAt: string;
};

/** @internal */
export const AssessmentOutcome$inboundSchema: z.ZodMiniType<
  AssessmentOutcome,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    assessment_id: types.string(),
    outcome: Outcome$inboundSchema,
    received_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "assessment_id": "assessmentId",
      "received_at": "receivedAt",
    });
  }),
);

export function assessmentOutcomeFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentOutcome, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentOutcome$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentOutcome' from JSON`,
  );
}
