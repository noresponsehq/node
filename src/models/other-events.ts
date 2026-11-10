import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { OtherEvent, OtherEvent$inboundSchema } from "./other-event.js";

/**
 * Where else in the environment the attendee appears, read live from those events: deleting one removes it here.
 */
export type OtherEvents = {
  /**
   * How many attendees of other events match, of which items lists the 20 most recent.
   */
  total: number;
  /**
   * The 20 attendees of the most recent other events, newest event first.
   */
  items: Array<OtherEvent>;
};

/** @internal */
export const OtherEvents$inboundSchema: z.ZodMiniType<OtherEvents, unknown> = z
  .object({
    total: types.number(),
    items: z.array(OtherEvent$inboundSchema),
  });

export function otherEventsFromJSON(
  jsonString: string,
): SafeParseResult<OtherEvents, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => OtherEvents$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'OtherEvents' from JSON`,
  );
}
