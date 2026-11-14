import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { RecordField, RecordField$inboundSchema } from "./record-field.js";
import { RecordMatch, RecordMatch$inboundSchema } from "./record-match.js";
import { RecordSource, RecordSource$inboundSchema } from "./record-source.js";

/**
 * One answer from one source: where it came from, what found it and every field it holds.
 */
export type RecordT = {
  /**
   * Made from the source and the fields' names and original values, so the same answer found twice is one record with the same id.
   */
  id: string;
  /**
   * Where a record came from.
   */
  source: RecordSource;
  /**
   * Each kind of searched value that found the record.
   */
  matched: Array<RecordMatch>;
  /**
   * Every field the source returned, in the order the source's connector lists them; a breach row's columns in name order. Nothing is withheld: a breach row's passwords, hashes and salts are fields like any other.
   */
  fields: Array<RecordField>;
  /**
   * When the source last gave this answer.
   */
  observedAt: string;
};

/** @internal */
export const RecordT$inboundSchema: z.ZodMiniType<RecordT, unknown> = z.pipe(
  z.object({
    id: types.string(),
    source: RecordSource$inboundSchema,
    matched: z.array(RecordMatch$inboundSchema),
    fields: z.array(RecordField$inboundSchema),
    observed_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "observed_at": "observedAt",
    });
  }),
);

export function recordFromJSON(
  jsonString: string,
): SafeParseResult<RecordT, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordT$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordT' from JSON`,
  );
}
