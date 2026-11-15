import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  WorkspacePerson,
  WorkspacePerson$inboundSchema,
} from "./workspace-person.js";

/**
 * List workspace people.
 */
export type WorkspacePeopleList = {
  items: Array<WorkspacePerson>;
  hasMore: boolean;
  nextCursor: string | null;
};

/** @internal */
export const WorkspacePeopleList$inboundSchema: z.ZodMiniType<
  WorkspacePeopleList,
  unknown
> = z.pipe(
  z.object({
    items: z.array(WorkspacePerson$inboundSchema),
    has_more: types.boolean(),
    next_cursor: types.nullable(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "has_more": "hasMore",
      "next_cursor": "nextCursor",
    });
  }),
);

export function workspacePeopleListFromJSON(
  jsonString: string,
): SafeParseResult<WorkspacePeopleList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkspacePeopleList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkspacePeopleList' from JSON`,
  );
}
