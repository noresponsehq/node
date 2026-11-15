import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PersonBatchItemOutcome,
  PersonBatchItemOutcome$inboundSchema,
} from "./person-batch-item-outcome.js";
import { PersonMatch, PersonMatch$inboundSchema } from "./person-match.js";

export type PersonBatchItem = {
  /**
   * The row's position in the request.
   */
  index: number;
  id: string;
  /**
   * unchanged: the row matched a person with the same details.
   */
  outcome: PersonBatchItemOutcome;
  suggestedMatches?: Array<PersonMatch> | undefined;
};

/** @internal */
export const PersonBatchItem$inboundSchema: z.ZodMiniType<
  PersonBatchItem,
  unknown
> = z.pipe(
  z.object({
    index: types.number(),
    id: types.string(),
    outcome: PersonBatchItemOutcome$inboundSchema,
    suggested_matches: types.optional(z.array(PersonMatch$inboundSchema)),
  }),
  z.transform((v) => {
    return remap$(v, {
      "suggested_matches": "suggestedMatches",
    });
  }),
);

export function personBatchItemFromJSON(
  jsonString: string,
): SafeParseResult<PersonBatchItem, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonBatchItem$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonBatchItem' from JSON`,
  );
}
