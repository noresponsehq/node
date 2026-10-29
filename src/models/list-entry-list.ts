import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { ListEntry, ListEntry$inboundSchema } from "./list-entry.js";

/**
 * Newest first. Without a query, returns every active entry for compatibility. With limit or cursor, returns up to 100 entries and an authenticated workspace/environment-bound cursor. Expired entries are omitted.
 */
export type ListEntryList = {
  items: Array<ListEntry>;
  nextCursor?: string | undefined;
};

/** @internal */
export const ListEntryList$inboundSchema: z.ZodMiniType<
  ListEntryList,
  unknown
> = z.pipe(
  z.object({
    items: z.array(ListEntry$inboundSchema),
    next_cursor: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "next_cursor": "nextCursor",
    });
  }),
);

export function listEntryListFromJSON(
  jsonString: string,
): SafeParseResult<ListEntryList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListEntryList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListEntryList' from JSON`,
  );
}
