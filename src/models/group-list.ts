import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Group, Group$inboundSchema } from "./group.js";

/**
 * Groups, newest first.
 */
export type GroupList = {
  items: Array<Group>;
  /**
   * Pass as before to read the next, older page.
   */
  nextBefore?: string | undefined;
};

/** @internal */
export const GroupList$inboundSchema: z.ZodMiniType<GroupList, unknown> = z
  .pipe(
    z.object({
      items: z.array(Group$inboundSchema),
      next_before: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "next_before": "nextBefore",
      });
    }),
  );

export function groupListFromJSON(
  jsonString: string,
): SafeParseResult<GroupList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GroupList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GroupList' from JSON`,
  );
}
