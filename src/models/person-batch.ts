import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PersonBatchItem,
  PersonBatchItem$inboundSchema,
} from "./person-batch-item.js";

/**
 * What the batch did, row by row.
 */
export type PersonBatch = {
  created: number;
  updated: number;
  items: Array<PersonBatchItem>;
};

/** @internal */
export const PersonBatch$inboundSchema: z.ZodMiniType<PersonBatch, unknown> = z
  .object({
    created: types.number(),
    updated: types.number(),
    items: z.array(PersonBatchItem$inboundSchema),
  });

export function personBatchFromJSON(
  jsonString: string,
): SafeParseResult<PersonBatch, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonBatch$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonBatch' from JSON`,
  );
}
