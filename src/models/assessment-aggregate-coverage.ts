import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Population, Population$inboundSchema } from "./population.js";

/**
 * Captured in the same database snapshot as the counts. Capture start times describe when counting began, not the earliest creation time counted: an older assessment may first answer later. Older outcomes are not inferred to be absent. Erased detail cannot be returned by drill-down even while its anonymous count remains.
 */
export type AssessmentAggregateCoverage = {
  asOf: string;
  firstAnswersStartedAt: string;
  scoreOutcomesStartedAt: string;
  retainedFrom: string;
  /**
   * first_answers uses anonymous counters that can include erased detail. retained_first_answers computes exact intersections over retained first answers within 31 days. Requests exceeding the 100000-record work budget are refused.
   */
  population: Population;
  erasedRecordsIncluded: boolean;
  overlappingGroups: boolean;
  lateFlipUnit: "decision_transitions";
  historicalBackfill: false;
};

/** @internal */
export const AssessmentAggregateCoverage$inboundSchema: z.ZodMiniType<
  AssessmentAggregateCoverage,
  unknown
> = z.pipe(
  z.object({
    as_of: types.string(),
    first_answers_started_at: types.string(),
    score_outcomes_started_at: types.string(),
    retained_from: types.string(),
    population: Population$inboundSchema,
    erased_records_included: types.boolean(),
    overlapping_groups: types.boolean(),
    late_flip_unit: types.literal("decision_transitions"),
    historical_backfill: types.literal(false),
  }),
  z.transform((v) => {
    return remap$(v, {
      "as_of": "asOf",
      "first_answers_started_at": "firstAnswersStartedAt",
      "score_outcomes_started_at": "scoreOutcomesStartedAt",
      "retained_from": "retainedFrom",
      "erased_records_included": "erasedRecordsIncluded",
      "overlapping_groups": "overlappingGroups",
      "late_flip_unit": "lateFlipUnit",
      "historical_backfill": "historicalBackfill",
    });
  }),
);

export function assessmentAggregateCoverageFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentAggregateCoverage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentAggregateCoverage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentAggregateCoverage' from JSON`,
  );
}
