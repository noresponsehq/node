import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Flow, Flow$inboundSchema } from "./flow.js";
import { Outcome, Outcome$inboundSchema } from "./outcome.js";

/**
 * First answers of one flow whose risk.score is in [score_min, score_max] and whose assessment's latest reported outcome (the latest received) is outcome. Counted when the first answer is counted and moved when a later outcome wins; outcomes reported before the first answer was counted are counted with it. An outcome reported before this count existed is counted only once another outcome is reported for the assessment.
 */
export type AggregateScoreOutcome = {
  /**
   * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
   */
  flow: Flow;
  /**
   * A multiple of 5.
   */
  scoreMin: number;
  scoreMax: number;
  /**
   * What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this workspace for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.
   */
  outcome: Outcome;
  count: number;
};

/** @internal */
export const AggregateScoreOutcome$inboundSchema: z.ZodMiniType<
  AggregateScoreOutcome,
  unknown
> = z.pipe(
  z.object({
    flow: Flow$inboundSchema,
    score_min: types.number(),
    score_max: types.number(),
    outcome: Outcome$inboundSchema,
    count: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "score_min": "scoreMin",
      "score_max": "scoreMax",
    });
  }),
);

export function aggregateScoreOutcomeFromJSON(
  jsonString: string,
): SafeParseResult<AggregateScoreOutcome, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AggregateScoreOutcome$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AggregateScoreOutcome' from JSON`,
  );
}
