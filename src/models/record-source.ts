import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Where a record came from.
 */
export type RecordSource = {
  /**
   * The id of the connector that read the record.
   */
  connector: string;
  /**
   * The kind of source: platform for an account read off a live platform.
   */
  kind: string;
  /**
   * The host a person knows the source's site by.
   */
  site?: string | undefined;
  /**
   * The table a leaked row came from.
   */
  table?: string | undefined;
  /**
   * When the source's data dates from, at the precision it is known.
   */
  date?: string | undefined;
};

/** @internal */
export const RecordSource$inboundSchema: z.ZodMiniType<RecordSource, unknown> =
  z.object({
    connector: types.string(),
    kind: types.string(),
    site: types.optional(types.string()),
    table: types.optional(types.string()),
    date: types.optional(types.string()),
  });

export function recordSourceFromJSON(
  jsonString: string,
): SafeParseResult<RecordSource, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordSource$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordSource' from JSON`,
  );
}
