import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Identifier, Identifier$inboundSchema } from "./identifier.js";
import {
  SignalOutcome,
  SignalOutcome$inboundSchema,
} from "./signal-outcome.js";

export type ScreeningLookupAnswer = {
  /**
   * The id of the connector asked: breach for the breach search.
   */
  connector: string;
  identifier: Identifier;
  /**
   * Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.
   */
  outcome: SignalOutcome;
  answeredAt?: string | undefined;
};

/** @internal */
export const ScreeningLookupAnswer$inboundSchema: z.ZodMiniType<
  ScreeningLookupAnswer,
  unknown
> = z.pipe(
  z.object({
    connector: types.string(),
    identifier: Identifier$inboundSchema,
    outcome: SignalOutcome$inboundSchema,
    answered_at: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "answered_at": "answeredAt",
    });
  }),
);

export function screeningLookupAnswerFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningLookupAnswer, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningLookupAnswer$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningLookupAnswer' from JSON`,
  );
}
