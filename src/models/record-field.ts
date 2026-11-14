import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * One value a source returned.
 */
export type RecordField = {
  /**
   * The source's own name for the field. A nested value's name is dotted, and a list element's carries its index.
   */
  field: string;
  /**
   * The value as the source wrote it. A count is written in decimal and a time in RFC 3339; a breach column's value is as the leak holds it.
   */
  original: string;
  /**
   * What sort of value the field holds. Absent until the field's kind is known.
   */
  kind?: string | undefined;
  /**
   * Which common field it is, where many sources share it, such as handle, display_name, account_id, profile_link, picture, bio, website, linked_account (named by its network), account_status, joined, last_updated, organisation, location, followers, following or posts. Absent for a field only this source returns.
   */
  role?: string | undefined;
  /**
   * The cleaned value. Absent when it cannot be cleaned, or until the field's kind is known.
   */
  value?: string | undefined;
};

/** @internal */
export const RecordField$inboundSchema: z.ZodMiniType<RecordField, unknown> = z
  .object({
    field: types.string(),
    original: types.string(),
    kind: types.optional(types.string()),
    role: types.optional(types.string()),
    value: types.optional(types.string()),
  });

export function recordFieldFromJSON(
  jsonString: string,
): SafeParseResult<RecordField, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordField$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordField' from JSON`,
  );
}
