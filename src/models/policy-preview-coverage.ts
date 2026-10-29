import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type PolicyPreviewCoverage = {
  scanned: number;
  eligible: number;
  missingScore: number;
  unsupported: number;
  truncated: boolean;
  completeRetainedWindow: boolean;
  /**
   * Deleted, expired and uncaptured records cannot be reconstructed. Counts describe retained evidence and provide no causal estimate of fraud prevented.
   */
  historicalPopulationKnown: false;
};

/** @internal */
export const PolicyPreviewCoverage$inboundSchema: z.ZodMiniType<
  PolicyPreviewCoverage,
  unknown
> = z.pipe(
  z.object({
    scanned: types.number(),
    eligible: types.number(),
    missing_score: types.number(),
    unsupported: types.number(),
    truncated: types.boolean(),
    complete_retained_window: types.boolean(),
    historical_population_known: types.literal(false),
  }),
  z.transform((v) => {
    return remap$(v, {
      "missing_score": "missingScore",
      "complete_retained_window": "completeRetainedWindow",
      "historical_population_known": "historicalPopulationKnown",
    });
  }),
);

export function policyPreviewCoverageFromJSON(
  jsonString: string,
): SafeParseResult<PolicyPreviewCoverage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PolicyPreviewCoverage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PolicyPreviewCoverage' from JSON`,
  );
}
