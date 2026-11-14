import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PersonBatchItemOutcome,
  PersonBatchItemOutcome$inboundSchema,
} from "./person-batch-item-outcome.js";

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
};

/** @internal */
export const PersonBatchItem$inboundSchema: z.ZodMiniType<
  PersonBatchItem,
  unknown
> = z.object({
  index: types.number(),
  id: types.string(),
  outcome: PersonBatchItemOutcome$inboundSchema,
});

export function personBatchItemFromJSON(
  jsonString: string,
): SafeParseResult<PersonBatchItem, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonBatchItem$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonBatchItem' from JSON`,
  );
}
