import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { PersonRole, PersonRole$inboundSchema } from "./person-role.js";

/**
 * One group the person belongs to and their role in it.
 */
export type PersonGroup = {
  groupId: string;
  groupName: string;
  /**
   * The group's optional event start; null for an ongoing group.
   */
  groupStartsAt: string | null;
  /**
   * The person's role in the group: guest, crew, vendor or press, or null when it was not given.
   */
  role: PersonRole | null;
  /**
   * When the person was added to the group.
   */
  addedAt: string;
};

/** @internal */
export const PersonGroup$inboundSchema: z.ZodMiniType<PersonGroup, unknown> = z
  .pipe(
    z.object({
      group_id: types.string(),
      group_name: types.string(),
      group_starts_at: types.nullable(types.string()),
      role: types.nullable(PersonRole$inboundSchema),
      added_at: types.string(),
    }),
    z.transform((v) => {
      return remap$(v, {
        "group_id": "groupId",
        "group_name": "groupName",
        "group_starts_at": "groupStartsAt",
        "added_at": "addedAt",
      });
    }),
  );

export function personGroupFromJSON(
  jsonString: string,
): SafeParseResult<PersonGroup, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonGroup$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonGroup' from JSON`,
  );
}
