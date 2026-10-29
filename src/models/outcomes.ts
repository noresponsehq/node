import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Coverage, Coverage$inboundSchema } from "./coverage.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  OutcomesByOutcome,
  OutcomesByOutcome$inboundSchema,
} from "./outcomes-by-outcome.js";

/**
 * Accounts whose current completed assessment was created in the selected window and remains retained at as_of. The effective account feedback head is observed at as_of, including explicit unknown reports. Customer-reported labels and unlabelled accounts have separate counts. Superseded labels are excluded.
 */
export type Outcomes = {
  population: "retained_current_accounts_by_current_assessment_created_at";
  denominator: number;
  reported: number;
  unreported: number;
  /**
   * Counts only; a zero denominator means no eligible retained records and does not imply a zero rate.
   */
  labelCoverage: Coverage;
  /**
   * Current customer-reported labels, not independently established ground truth. Missing keys mean zero. Unknown is an explicit report; absent or expired feedback is unreported.
   */
  byOutcome: OutcomesByOutcome;
};

/** @internal */
export const Outcomes$inboundSchema: z.ZodMiniType<Outcomes, unknown> = z.pipe(
  z.object({
    population: types.literal(
      "retained_current_accounts_by_current_assessment_created_at",
    ),
    denominator: types.number(),
    reported: types.number(),
    unreported: types.number(),
    label_coverage: Coverage$inboundSchema,
    by_outcome: OutcomesByOutcome$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "label_coverage": "labelCoverage",
      "by_outcome": "byOutcome",
    });
  }),
);

export function outcomesFromJSON(
  jsonString: string,
): SafeParseResult<Outcomes, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Outcomes$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Outcomes' from JSON`,
  );
}
