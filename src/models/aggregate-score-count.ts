import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Flow, Flow$inboundSchema } from "./flow.js";

/**
 * First answers of one flow whose risk.score is in [score_min, score_max]: 0-4, 5-9 up to 95-100. A pending answer has no score.
 */
export type AggregateScoreCount = {
  /**
   * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
   */
  flow: Flow;
  /**
   * A multiple of 5.
   */
  scoreMin: number;
  scoreMax: number;
  count: number;
};

/** @internal */
export const AggregateScoreCount$inboundSchema: z.ZodMiniType<
  AggregateScoreCount,
  unknown
> = z.pipe(
  z.object({
    flow: Flow$inboundSchema,
    score_min: types.number(),
    score_max: types.number(),
    count: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "score_min": "scoreMin",
      "score_max": "scoreMax",
    });
  }),
);

export function aggregateScoreCountFromJSON(
  jsonString: string,
): SafeParseResult<AggregateScoreCount, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AggregateScoreCount$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AggregateScoreCount' from JSON`,
  );
}
