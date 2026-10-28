import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Outcome, Outcome$inboundSchema } from "./outcome.js";

/**
 * Structured fields of a retained per-assessment outcome. Legacy notes remain private as promised by the existing outcome contract.
 */
export type ExportAssessmentOutcome = {
  /**
   * Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.
   */
  id: string;
  /**
   * Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.
   */
  assessmentId: string;
  /**
   * What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this workspace for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.
   */
  outcome: Outcome;
  observedAt: string;
  receivedAt: string;
  /**
   * Your own opaque reference for the outcome, such as a case or ticket id. Stored as given and not interpreted; keep direct identifiers out of it.
   */
  externalRef?: string | undefined;
};

/** @internal */
export const ExportAssessmentOutcome$inboundSchema: z.ZodMiniType<
  ExportAssessmentOutcome,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    assessment_id: types.string(),
    outcome: Outcome$inboundSchema,
    observed_at: types.string(),
    received_at: types.string(),
    external_ref: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "assessment_id": "assessmentId",
      "observed_at": "observedAt",
      "received_at": "receivedAt",
      "external_ref": "externalRef",
    });
  }),
);

export function exportAssessmentOutcomeFromJSON(
  jsonString: string,
): SafeParseResult<ExportAssessmentOutcome, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ExportAssessmentOutcome$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ExportAssessmentOutcome' from JSON`,
  );
}
