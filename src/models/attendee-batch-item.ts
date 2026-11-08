import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AttendeeBatchItemOutcome,
  AttendeeBatchItemOutcome$inboundSchema,
} from "./attendee-batch-item-outcome.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AttendeeBatchItem = {
  /**
   * The row's position in the request.
   */
  index: number;
  id: string;
  /**
   * unchanged: the row matched an attendee with the same details.
   */
  outcome: AttendeeBatchItemOutcome;
};

/** @internal */
export const AttendeeBatchItem$inboundSchema: z.ZodMiniType<
  AttendeeBatchItem,
  unknown
> = z.object({
  index: types.number(),
  id: types.string(),
  outcome: AttendeeBatchItemOutcome$inboundSchema,
});

export function attendeeBatchItemFromJSON(
  jsonString: string,
): SafeParseResult<AttendeeBatchItem, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttendeeBatchItem$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttendeeBatchItem' from JSON`,
  );
}
