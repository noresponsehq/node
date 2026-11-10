import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AttendeeDecision,
  AttendeeDecision$inboundSchema,
} from "./attendee-decision.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { HighestBand, HighestBand$inboundSchema } from "./highest-band.js";
import { MatchState, MatchState$inboundSchema } from "./match-state.js";

export const MatchedOn = {
  Email: "email",
  Phone: "phone",
  ExternalId: "external_id",
} as const;
export type MatchedOn = OpenEnum<typeof MatchedOn>;

/**
 * An attendee of another event in the same environment who shares an email or phone with this one, as that event recorded them.
 */
export type OtherEvent = {
  eventId: string;
  eventName: string;
  eventStartsAt: string;
  /**
   * The attendee on that event's list.
   */
  attendeeId: string;
  /**
   * Which identifiers match, in this order. external_id appears only beside email or phone: the same external id alone is not a match, since ticket numbers may be reused across events.
   */
  matchedOn: Array<MatchedOn>;
  /**
   * How sure the latest screening is that it found the attendee's accounts. unscreened until a screening reaches the attendee, and after one that had no profile to check (no_profile_to_check).
   */
  matchState: MatchState;
  /**
   * true when that attendee's latest screening had no profile to check (see the attendee's no_profile_to_check). Left out otherwise.
   */
  noProfileToCheck?: boolean | undefined;
  /**
   * That attendee's most severe band at that event, or null.
   */
  highestBand: HighestBand | null;
  /**
   * The latest reviewer decision at that event, or null before any.
   */
  decision: AttendeeDecision | null;
  /**
   * Who made that decision.
   */
  decidedBy?: string | undefined;
  /**
   * When that decision was made.
   */
  decidedAt?: string | undefined;
};

/** @internal */
export const MatchedOn$inboundSchema: z.ZodMiniType<MatchedOn, unknown> =
  openEnums.inboundSchema(MatchedOn);

/** @internal */
export const OtherEvent$inboundSchema: z.ZodMiniType<OtherEvent, unknown> = z
  .pipe(
    z.object({
      event_id: types.string(),
      event_name: types.string(),
      event_starts_at: types.string(),
      attendee_id: types.string(),
      matched_on: z.array(MatchedOn$inboundSchema),
      match_state: MatchState$inboundSchema,
      no_profile_to_check: types.optional(types.boolean()),
      highest_band: types.nullable(HighestBand$inboundSchema),
      decision: types.nullable(AttendeeDecision$inboundSchema),
      decided_by: types.optional(types.string()),
      decided_at: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "event_id": "eventId",
        "event_name": "eventName",
        "event_starts_at": "eventStartsAt",
        "attendee_id": "attendeeId",
        "matched_on": "matchedOn",
        "match_state": "matchState",
        "no_profile_to_check": "noProfileToCheck",
        "highest_band": "highestBand",
        "decided_by": "decidedBy",
        "decided_at": "decidedAt",
      });
    }),
  );

export function otherEventFromJSON(
  jsonString: string,
): SafeParseResult<OtherEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => OtherEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'OtherEvent' from JSON`,
  );
}
