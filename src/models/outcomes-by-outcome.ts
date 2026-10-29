import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Current customer-reported labels, not independently established ground truth. Missing keys mean zero. Unknown is an explicit report; absent or expired feedback is unreported.
 */
export type OutcomesByOutcome = {
  confirmedAbuse?: number | undefined;
  accountTakeover?: number | undefined;
  chargeback?: number | undefined;
  falsePositive?: number | undefined;
  legitimate?: number | undefined;
  unknown?: number | undefined;
};

/** @internal */
export const OutcomesByOutcome$inboundSchema: z.ZodMiniType<
  OutcomesByOutcome,
  unknown
> = z.pipe(
  z.object({
    confirmed_abuse: types.optional(types.number()),
    account_takeover: types.optional(types.number()),
    chargeback: types.optional(types.number()),
    false_positive: types.optional(types.number()),
    legitimate: types.optional(types.number()),
    unknown: types.optional(types.number()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "confirmed_abuse": "confirmedAbuse",
      "account_takeover": "accountTakeover",
      "false_positive": "falsePositive",
    });
  }),
);

export function outcomesByOutcomeFromJSON(
  jsonString: string,
): SafeParseResult<OutcomesByOutcome, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => OutcomesByOutcome$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'OutcomesByOutcome' from JSON`,
  );
}
