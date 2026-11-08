import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AttendeeFlaggedMatchState,
  AttendeeFlaggedMatchState$inboundSchema,
  AttendeeFlaggedMatchState$outboundSchema,
} from "./attendee-flagged-match-state.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  HighestBand,
  HighestBand$inboundSchema,
  HighestBand$outboundSchema,
} from "./highest-band.js";

/**
 * A screening recorded a finding on an attendee. It says which attendee and how severe, not what they posted, who they are or why: GET the attendee report for the findings. Sent once per screening that flags the attendee, so a re-screen of someone on watch announces them again.
 */
export type AttendeeFlagged = {
  /**
   * The attendee's event.
   */
  eventId: string;
  /**
   * The flagged attendee.
   */
  attendeeId: string;
  /**
   * The screening that flagged them.
   */
  screeningId: string;
  highestBand: HighestBand;
  /**
   * How sure the screening is that the accounts it read are the attendee's. A finding on a possible match is at most moderate, on a probable match at most high.
   */
  matchState: AttendeeFlaggedMatchState;
  /**
   * When the screening recorded the finding; equal to the event's created_at.
   */
  flaggedAt: string;
};

/** @internal */
export const AttendeeFlagged$inboundSchema: z.ZodMiniType<
  AttendeeFlagged,
  unknown
> = z.pipe(
  z.object({
    event_id: types.string(),
    attendee_id: types.string(),
    screening_id: types.string(),
    highest_band: HighestBand$inboundSchema,
    match_state: AttendeeFlaggedMatchState$inboundSchema,
    flagged_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "event_id": "eventId",
      "attendee_id": "attendeeId",
      "screening_id": "screeningId",
      "highest_band": "highestBand",
      "match_state": "matchState",
      "flagged_at": "flaggedAt",
    });
  }),
);
/** @internal */
export type AttendeeFlagged$Outbound = {
  event_id: string;
  attendee_id: string;
  screening_id: string;
  highest_band: string;
  match_state: string;
  flagged_at: string;
};

/** @internal */
export const AttendeeFlagged$outboundSchema: z.ZodMiniType<
  AttendeeFlagged$Outbound,
  AttendeeFlagged
> = z.pipe(
  z.object({
    eventId: z.string(),
    attendeeId: z.string(),
    screeningId: z.string(),
    highestBand: HighestBand$outboundSchema,
    matchState: AttendeeFlaggedMatchState$outboundSchema,
    flaggedAt: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      eventId: "event_id",
      attendeeId: "attendee_id",
      screeningId: "screening_id",
      highestBand: "highest_band",
      matchState: "match_state",
      flaggedAt: "flagged_at",
    });
  }),
);

export function attendeeFlaggedToJSON(
  attendeeFlagged: AttendeeFlagged,
): string {
  return JSON.stringify(AttendeeFlagged$outboundSchema.parse(attendeeFlagged));
}
export function attendeeFlaggedFromJSON(
  jsonString: string,
): SafeParseResult<AttendeeFlagged, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttendeeFlagged$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttendeeFlagged' from JSON`,
  );
}
