import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Person, Person$inboundSchema } from "./person.js";

/**
 * People in upload order.
 */
export type PersonList = {
  items: Array<Person>;
  /**
   * Pass as after to read the next page.
   */
  nextAfter?: string | undefined;
};

/** @internal */
export const PersonList$inboundSchema: z.ZodMiniType<PersonList, unknown> = z
  .pipe(
    z.object({
      items: z.array(Person$inboundSchema),
      next_after: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "next_after": "nextAfter",
      });
    }),
  );

export function personListFromJSON(
  jsonString: string,
): SafeParseResult<PersonList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonList' from JSON`,
  );
}
