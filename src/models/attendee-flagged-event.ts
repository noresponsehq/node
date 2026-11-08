import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AttendeeFlagged,
  AttendeeFlagged$inboundSchema,
  AttendeeFlagged$Outbound,
  AttendeeFlagged$outboundSchema,
} from "./attendee-flagged.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The attendee.flagged event.
 */
export type AttendeeFlaggedEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always attendee.flagged.
   */
  type: "attendee.flagged";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  /**
   * A screening recorded a finding on an attendee. It says which attendee and how severe, not what they posted, who they are or why: GET the attendee report for the findings. Sent once per screening that flags the attendee, so a re-screen of someone on watch announces them again.
   */
  data: AttendeeFlagged;
};

/** @internal */
export const AttendeeFlaggedEvent$inboundSchema: z.ZodMiniType<
  AttendeeFlaggedEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("attendee.flagged"),
    test: types.optional(types.boolean()),
    data: AttendeeFlagged$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type AttendeeFlaggedEvent$Outbound = {
  id: string;
  created_at: string;
  type: "attendee.flagged";
  test?: boolean | undefined;
  data: AttendeeFlagged$Outbound;
};

/** @internal */
export const AttendeeFlaggedEvent$outboundSchema: z.ZodMiniType<
  AttendeeFlaggedEvent$Outbound,
  AttendeeFlaggedEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("attendee.flagged"),
    test: z.optional(z.boolean()),
    data: AttendeeFlagged$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function attendeeFlaggedEventToJSON(
  attendeeFlaggedEvent: AttendeeFlaggedEvent,
): string {
  return JSON.stringify(
    AttendeeFlaggedEvent$outboundSchema.parse(attendeeFlaggedEvent),
  );
}
export function attendeeFlaggedEventFromJSON(
  jsonString: string,
): SafeParseResult<AttendeeFlaggedEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttendeeFlaggedEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttendeeFlaggedEvent' from JSON`,
  );
}
