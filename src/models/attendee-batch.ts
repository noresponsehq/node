import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AttendeeBatchItem,
  AttendeeBatchItem$inboundSchema,
} from "./attendee-batch-item.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * What the batch did, row by row.
 */
export type AttendeeBatch = {
  created: number;
  updated: number;
  items: Array<AttendeeBatchItem>;
};

/** @internal */
export const AttendeeBatch$inboundSchema: z.ZodMiniType<
  AttendeeBatch,
  unknown
> = z.object({
  created: types.number(),
  updated: types.number(),
  items: z.array(AttendeeBatchItem$inboundSchema),
});

export function attendeeBatchFromJSON(
  jsonString: string,
): SafeParseResult<AttendeeBatch, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttendeeBatch$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttendeeBatch' from JSON`,
  );
}
