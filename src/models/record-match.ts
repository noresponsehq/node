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
   * The kind of searched value: email, phone, username, ip, name, or handle for a profile read of a handle.
   */
  by: string;
  /**
   * The field the searched value hit, when the record holds it.
   */
  field?: string | undefined;
};

/** @internal */
export const RecordMatch$inboundSchema: z.ZodMiniType<RecordMatch, unknown> = z
  .object({
    by: types.string(),
    field: types.optional(types.string()),
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
