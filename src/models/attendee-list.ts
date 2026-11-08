import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Attendee, Attendee$inboundSchema } from "./attendee.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Attendees in upload order.
 */
export type AttendeeList = {
  items: Array<Attendee>;
  /**
   * Pass as after to read the next page.
   */
  nextAfter?: string | undefined;
};

/** @internal */
export const AttendeeList$inboundSchema: z.ZodMiniType<AttendeeList, unknown> =
  z.pipe(
    z.object({
      items: z.array(Attendee$inboundSchema),
      next_after: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "next_after": "nextAfter",
      });
    }),
  );

export function attendeeListFromJSON(
  jsonString: string,
): SafeParseResult<AttendeeList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttendeeList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttendeeList' from JSON`,
  );
}
