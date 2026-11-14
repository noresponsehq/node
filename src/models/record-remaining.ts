import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { RecordSource, RecordSource$inboundSchema } from "./record-source.js";

/**
 * Rows one search matched in one source that the lookup's records leave out, so no answer is cut short in silence.
 */
export type RecordRemaining = {
  /**
   * Where a record came from.
   */
  source: RecordSource;
  /**
   * The kind of searched value whose search matched the rows, as a record's matched names it.
   */
  by: string;
  /**
   * The search a person started that matched the rows. Searching the same field again with this source's table fetches them.
   */
  search?: string | undefined;
  /**
   * How many rows of the source that search matched beyond the records the lookup carries.
   */
  rows: number;
};

/** @internal */
export const RecordRemaining$inboundSchema: z.ZodMiniType<
  RecordRemaining,
  unknown
> = z.object({
  source: RecordSource$inboundSchema,
  by: types.string(),
  search: types.optional(types.string()),
  rows: types.number(),
});

export function recordRemainingFromJSON(
  jsonString: string,
): SafeParseResult<RecordRemaining, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordRemaining$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordRemaining' from JSON`,
  );
}
