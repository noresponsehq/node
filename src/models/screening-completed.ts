import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningCompletedByBand,
  ScreeningCompletedByBand$inboundSchema,
  ScreeningCompletedByBand$Outbound,
  ScreeningCompletedByBand$outboundSchema,
} from "./screening-completed-by-band.js";
import {
  ScreeningCompletedStatus,
  ScreeningCompletedStatus$inboundSchema,
  ScreeningCompletedStatus$outboundSchema,
} from "./screening-completed-status.js";

/**
 * A screening of an event finished. It counts only the attendees this screening set out to reach, not who they are: read the roster with GET /v1/workspaces/{workspace_id}/events/{environment}/{event_id}/attendees, filtered by band, to act on them. attendees_screened + partial_coverage = attendees_total, attendees_flagged is the sum of by_band, no_footprint counts screened attendees with no flag whose accounts were not found, and no_profile_to_check those the screening had nothing to look up for on any requested platform. A cancelled screening sends no event.
 */
export type ScreeningCompleted = {
  /**
   * The screening that finished.
   */
  screeningId: string;
  /**
   * The event it screened.
   */
  eventId: string;
  /**
   * completed reached every attendee; partial left some not fully covered (partial_coverage); failed covered nobody.
   */
  status: ScreeningCompletedStatus;
  /**
   * Why a partial or failed screening stopped before reaching everyone, as the screening resource says: expired, worker_attempts_exhausted, attempts_exhausted or screening_unavailable.
   */
  errorCode?: string | undefined;
  /**
   * Every attendee the screening set out to reach: those no screening had reached and those on watch or escalated.
   */
  attendeesTotal: number;
  /**
   * Attendees the screening covered, flagged or not.
   */
  attendeesScreened: number;
  /**
   * Screened attendees with a finding: the sum of by_band.
   */
  attendeesFlagged: number;
  /**
   * Screened attendees by the band of their most severe finding.
   */
  byBand: ScreeningCompletedByBand;
  /**
   * Screened attendees with no finding whose accounts were not found (match_state none_found). A clean result for someone with no visible accounts is not the same as a clean result for someone whose accounts were read.
   */
  noFootprint: number;
  /**
   * Screened attendees with no profile to check: the list gave nothing to look up on any requested platform, such as no handle, so nobody looked for a profile (no_profile_to_check on the attendee). Not in no_footprint, and not partial: nothing failed. Their lookups are on their reports.
   */
  noProfileToCheck?: number | undefined;
  /**
   * Attendees the screening did not fully cover. Read each one's coverage on its attendee.
   */
  partialCoverage: number;
  /**
   * When the screening finished; equal to the event's created_at.
   */
  finishedAt: string;
};

/** @internal */
export const ScreeningCompleted$inboundSchema: z.ZodMiniType<
  ScreeningCompleted,
  unknown
> = z.pipe(
  z.object({
    screening_id: types.string(),
    event_id: types.string(),
    status: ScreeningCompletedStatus$inboundSchema,
    error_code: types.optional(types.string()),
    attendees_total: types.number(),
    attendees_screened: types.number(),
    attendees_flagged: types.number(),
    by_band: ScreeningCompletedByBand$inboundSchema,
    no_footprint: types.number(),
    no_profile_to_check: types.optional(types.number()),
    partial_coverage: types.number(),
    finished_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "screening_id": "screeningId",
      "event_id": "eventId",
      "error_code": "errorCode",
      "attendees_total": "attendeesTotal",
      "attendees_screened": "attendeesScreened",
      "attendees_flagged": "attendeesFlagged",
      "by_band": "byBand",
      "no_footprint": "noFootprint",
      "no_profile_to_check": "noProfileToCheck",
      "partial_coverage": "partialCoverage",
      "finished_at": "finishedAt",
    });
  }),
);
/** @internal */
export type ScreeningCompleted$Outbound = {
  screening_id: string;
  event_id: string;
  status: string;
  error_code?: string | undefined;
  attendees_total: number;
  attendees_screened: number;
  attendees_flagged: number;
  by_band: ScreeningCompletedByBand$Outbound;
  no_footprint: number;
  no_profile_to_check?: number | undefined;
  partial_coverage: number;
  finished_at: string;
};

/** @internal */
export const ScreeningCompleted$outboundSchema: z.ZodMiniType<
  ScreeningCompleted$Outbound,
  ScreeningCompleted
> = z.pipe(
  z.object({
    screeningId: z.string(),
    eventId: z.string(),
    status: ScreeningCompletedStatus$outboundSchema,
    errorCode: z.optional(z.string()),
    attendeesTotal: z.int(),
    attendeesScreened: z.int(),
    attendeesFlagged: z.int(),
    byBand: ScreeningCompletedByBand$outboundSchema,
    noFootprint: z.int(),
    noProfileToCheck: z.optional(z.int()),
    partialCoverage: z.int(),
    finishedAt: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      screeningId: "screening_id",
      eventId: "event_id",
      errorCode: "error_code",
      attendeesTotal: "attendees_total",
      attendeesScreened: "attendees_screened",
      attendeesFlagged: "attendees_flagged",
      byBand: "by_band",
      noFootprint: "no_footprint",
      noProfileToCheck: "no_profile_to_check",
      partialCoverage: "partial_coverage",
      finishedAt: "finished_at",
    });
  }),
);

export function screeningCompletedToJSON(
  screeningCompleted: ScreeningCompleted,
): string {
  return JSON.stringify(
    ScreeningCompleted$outboundSchema.parse(screeningCompleted),
  );
}
export function screeningCompletedFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningCompleted, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningCompleted$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningCompleted' from JSON`,
  );
}
