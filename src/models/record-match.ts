import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * One searched value that found the record.
 */
export type RecordMatch = {
  /**
   * The kind of searched value: email, phone, username, ip, name, password, hash, or handle for a profile read of a handle.
   */
  by: string;
  /**
   * The field the searched value hit, when the record holds it.
   */
  field?: string | undefined;
  /**
   * The search a person started on a value of another record that found this one, among the person report's searches, which names the value and the record and field it came from. A record found only by such searches is a lead, whatever kind of value found it. Absent for a match of the lookups.
   */
  search?: string | undefined;
};

/** @internal */
export const RecordMatch$inboundSchema: z.ZodMiniType<RecordMatch, unknown> = z
  .object({
    by: types.string(),
    field: types.optional(types.string()),
    search: types.optional(types.string()),
  });

export function recordMatchFromJSON(
  jsonString: string,
): SafeParseResult<RecordMatch, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordMatch$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordMatch' from JSON`,
  );
}
