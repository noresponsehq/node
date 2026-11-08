import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AttendeeDecided,
  AttendeeDecided$inboundSchema,
  AttendeeDecided$Outbound,
  AttendeeDecided$outboundSchema,
} from "./attendee-decided.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The attendee.decided event.
 */
export type AttendeeDecidedEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always attendee.decided.
   */
  type: "attendee.decided";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  /**
   * A reviewer recorded a decision on an attendee. The decision's note stays in the API. Sent once per recorded review; an attendee's latest review is its decision, so order by decided_at.
   */
  data: AttendeeDecided;
};

/** @internal */
export const AttendeeDecidedEvent$inboundSchema: z.ZodMiniType<
  AttendeeDecidedEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("attendee.decided"),
    test: types.optional(types.boolean()),
    data: AttendeeDecided$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type AttendeeDecidedEvent$Outbound = {
  id: string;
  created_at: string;
  type: "attendee.decided";
  test?: boolean | undefined;
  data: AttendeeDecided$Outbound;
};

/** @internal */
export const AttendeeDecidedEvent$outboundSchema: z.ZodMiniType<
  AttendeeDecidedEvent$Outbound,
  AttendeeDecidedEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("attendee.decided"),
    test: z.optional(z.boolean()),
    data: AttendeeDecided$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function attendeeDecidedEventToJSON(
  attendeeDecidedEvent: AttendeeDecidedEvent,
): string {
  return JSON.stringify(
    AttendeeDecidedEvent$outboundSchema.parse(attendeeDecidedEvent),
  );
}
export function attendeeDecidedEventFromJSON(
  jsonString: string,
): SafeParseResult<AttendeeDecidedEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttendeeDecidedEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttendeeDecidedEvent' from JSON`,
  );
}
