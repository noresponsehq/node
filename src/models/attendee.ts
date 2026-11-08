import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AttendeeDecision,
  AttendeeDecision$inboundSchema,
} from "./attendee-decision.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Handle, Handle$inboundSchema } from "./handle.js";
import { HighestBand, HighestBand$inboundSchema } from "./highest-band.js";
import { MatchState, MatchState$inboundSchema } from "./match-state.js";

/**
 * What the latest screening read, per platform.
 */
export type AttendeeCoverage = {};

/**
 * An attendee and where their screening and review stand.
 */
export type Attendee = {
  id: string;
  eventId: string;
  /**
   * Your own id for the attendee, unique within the event. A later row with the same external id updates this attendee.
   */
  externalId?: string | undefined;
  /**
   * The attendee's full name.
   */
  name: string;
  /**
   * The attendee's email.
   */
  email?: string | undefined;
  /**
   * The attendee's phone in E.164 form.
   */
  phone?: string | undefined;
  /**
   * Where the attendee works.
   */
  company?: string | undefined;
  /**
   * Where the attendee lives.
   */
  city?: string | undefined;
  /**
   * Accounts the attendee is known to hold, at most 20.
   */
  handles?: Array<Handle> | undefined;
  /**
   * How sure the latest screening is that it found the attendee's accounts. unscreened until a screening reaches the attendee.
   */
  matchState: MatchState;
  /**
   * The most severe finding's band, or null when nothing was flagged.
   */
  highestBand: HighestBand | null;
  /**
   * The latest reviewer decision, or null before any.
   */
  decision: AttendeeDecision | null;
  decisionNote?: string | undefined;
  decidedBy?: string | undefined;
  decidedAt?: string | undefined;
  /**
   * What the latest screening read, per platform.
   */
  coverage: AttendeeCoverage;
  lastScreeningId?: string | undefined;
  screenedAt?: string | undefined;
  createdAt: string;
  updatedAt: string;
};

/** @internal */
export const AttendeeCoverage$inboundSchema: z.ZodMiniType<
  AttendeeCoverage,
  unknown
> = z.object({});

export function attendeeCoverageFromJSON(
  jsonString: string,
): SafeParseResult<AttendeeCoverage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttendeeCoverage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttendeeCoverage' from JSON`,
  );
}

/** @internal */
export const Attendee$inboundSchema: z.ZodMiniType<Attendee, unknown> = z.pipe(
  z.object({
    id: types.string(),
    event_id: types.string(),
    external_id: types.optional(types.string()),
    name: types.string(),
    email: types.optional(types.string()),
    phone: types.optional(types.string()),
    company: types.optional(types.string()),
    city: types.optional(types.string()),
    handles: types.optional(z.array(Handle$inboundSchema)),
    match_state: MatchState$inboundSchema,
    highest_band: types.nullable(HighestBand$inboundSchema),
    decision: types.nullable(AttendeeDecision$inboundSchema),
    decision_note: types.optional(types.string()),
    decided_by: types.optional(types.string()),
    decided_at: types.optional(types.string()),
    coverage: z.lazy(() => AttendeeCoverage$inboundSchema),
    last_screening_id: types.optional(types.string()),
    screened_at: types.optional(types.string()),
    created_at: types.string(),
    updated_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "event_id": "eventId",
      "external_id": "externalId",
      "match_state": "matchState",
      "highest_band": "highestBand",
      "decision_note": "decisionNote",
      "decided_by": "decidedBy",
      "decided_at": "decidedAt",
      "last_screening_id": "lastScreeningId",
      "screened_at": "screenedAt",
      "created_at": "createdAt",
      "updated_at": "updatedAt",
    });
  }),
);

export function attendeeFromJSON(
  jsonString: string,
): SafeParseResult<Attendee, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Attendee$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Attendee' from JSON`,
  );
}
