import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AttendeeDecision,
  AttendeeDecision$inboundSchema,
  AttendeeDecision$outboundSchema,
} from "./attendee-decision.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * A reviewer recorded a decision on an attendee. The decision's note stays in the API. Sent once per recorded review; an attendee's latest review is its decision, so order by decided_at.
 */
export type AttendeeDecided = {
  /**
   * The attendee's event.
   */
  eventId: string;
  /**
   * The attendee decided on.
   */
  attendeeId: string;
  /**
   * The recorded review.
   */
  reviewId: string;
  decision: AttendeeDecision;
  /**
   * Who decided: the member's external user id, or the API key's label, as the attendee's decided_by.
   */
  decidedBy: string;
  /**
   * When the decision was recorded; equal to the event's created_at.
   */
  decidedAt: string;
};

/** @internal */
export const AttendeeDecided$inboundSchema: z.ZodMiniType<
  AttendeeDecided,
  unknown
> = z.pipe(
  z.object({
    event_id: types.string(),
    attendee_id: types.string(),
    review_id: types.string(),
    decision: AttendeeDecision$inboundSchema,
    decided_by: types.string(),
    decided_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "event_id": "eventId",
      "attendee_id": "attendeeId",
      "review_id": "reviewId",
      "decided_by": "decidedBy",
      "decided_at": "decidedAt",
    });
  }),
);
/** @internal */
export type AttendeeDecided$Outbound = {
  event_id: string;
  attendee_id: string;
  review_id: string;
  decision: string;
  decided_by: string;
  decided_at: string;
};

/** @internal */
export const AttendeeDecided$outboundSchema: z.ZodMiniType<
  AttendeeDecided$Outbound,
  AttendeeDecided
> = z.pipe(
  z.object({
    eventId: z.string(),
    attendeeId: z.string(),
    reviewId: z.string(),
    decision: AttendeeDecision$outboundSchema,
    decidedBy: z.string(),
    decidedAt: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      eventId: "event_id",
      attendeeId: "attendee_id",
      reviewId: "review_id",
      decidedBy: "decided_by",
      decidedAt: "decided_at",
    });
  }),
);

export function attendeeDecidedToJSON(
  attendeeDecided: AttendeeDecided,
): string {
  return JSON.stringify(AttendeeDecided$outboundSchema.parse(attendeeDecided));
}
export function attendeeDecidedFromJSON(
  jsonString: string,
): SafeParseResult<AttendeeDecided, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttendeeDecided$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttendeeDecided' from JSON`,
  );
}
