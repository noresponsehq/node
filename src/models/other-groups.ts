import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { OtherGroup, OtherGroup$inboundSchema } from "./other-group.js";

/**
 * Where else in the environment the person appears, read live from those groups: deleting one removes it here.
 */
export type OtherGroups = {
  /**
   * How many people of other groups match, of which items lists the 20 most recent.
   */
  total: number;
  /**
   * The 20 people of the most recent other groups, newest group first.
   */
  items: Array<OtherGroup>;
};

/** @internal */
export const OtherGroups$inboundSchema: z.ZodMiniType<OtherGroups, unknown> = z
  .object({
    total: types.number(),
    items: z.array(OtherGroup$inboundSchema),
  });

export function otherGroupsFromJSON(
  jsonString: string,
): SafeParseResult<OtherGroups, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => OtherGroups$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'OtherGroups' from JSON`,
  );
}
