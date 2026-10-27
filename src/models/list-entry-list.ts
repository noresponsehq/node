import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { ListEntry, ListEntry$inboundSchema } from "./list-entry.js";

/**
 * GET /v1/workspaces/{workspace_id}/lists/{environment}: every entry of the environment's list, newest first. An environment holds at most 10,000 entries.
 */
export type ListEntryList = {
  items: Array<ListEntry>;
};

/** @internal */
export const ListEntryList$inboundSchema: z.ZodMiniType<
  ListEntryList,
  unknown
> = z.object({
  items: z.array(ListEntry$inboundSchema),
});

export function listEntryListFromJSON(
  jsonString: string,
): SafeParseResult<ListEntryList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListEntryList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListEntryList' from JSON`,
  );
}
