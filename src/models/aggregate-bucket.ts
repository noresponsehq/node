import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AggregateGroup,
  AggregateGroup$inboundSchema,
} from "./aggregate-group.js";
import {
  AggregateLateFlip,
  AggregateLateFlip$inboundSchema,
} from "./aggregate-late-flip.js";
import {
  AggregateScoreCount,
  AggregateScoreCount$inboundSchema,
} from "./aggregate-score-count.js";
import {
  AggregateScoreOutcome,
  AggregateScoreOutcome$inboundSchema,
} from "./aggregate-score-outcome.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AggregateBucket = {
  start: string;
  /**
   * Assessments first answered whose creation falls in the bucket. With metric count.
   */
  count?: number | undefined;
  /**
   * With metric count and group_by: the bucket's counts of the groups answered, largest group first.
   */
  groups?: Array<AggregateGroup> | undefined;
  scoreHistogram?: Array<AggregateScoreCount> | undefined;
  /**
   * With metric score_outcomes: the score_histogram's first answers whose assessment has a reported outcome, by its latest. A bin's count less its score_outcomes is the first answers with none reported.
   */
  scoreOutcomes?: Array<AggregateScoreOutcome> | undefined;
  lateFlips?: Array<AggregateLateFlip> | undefined;
};

/** @internal */
export const AggregateBucket$inboundSchema: z.ZodMiniType<
  AggregateBucket,
  unknown
> = z.pipe(
  z.object({
    start: types.string(),
    count: types.optional(types.number()),
    groups: types.optional(z.array(AggregateGroup$inboundSchema)),
    score_histogram: types.optional(z.array(AggregateScoreCount$inboundSchema)),
    score_outcomes: types.optional(
      z.array(AggregateScoreOutcome$inboundSchema),
    ),
    late_flips: types.optional(z.array(AggregateLateFlip$inboundSchema)),
  }),
  z.transform((v) => {
    return remap$(v, {
      "score_histogram": "scoreHistogram",
      "score_outcomes": "scoreOutcomes",
      "late_flips": "lateFlips",
    });
  }),
);

export function aggregateBucketFromJSON(
  jsonString: string,
): SafeParseResult<AggregateBucket, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AggregateBucket$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AggregateBucket' from JSON`,
  );
}
