import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AttendeeReview,
  AttendeeReview$inboundSchema,
} from "./attendee-review.js";
import { Attendee, Attendee$inboundSchema } from "./attendee.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { OtherEvents, OtherEvents$inboundSchema } from "./other-events.js";
import {
  ScreeningFinding,
  ScreeningFinding$inboundSchema,
} from "./screening-finding.js";
import {
  ScreeningLookup,
  ScreeningLookup$inboundSchema,
} from "./screening-lookup.js";
import {
  ScreeningMedia,
  ScreeningMedia$inboundSchema,
} from "./screening-media.js";
import {
  ScreeningPost,
  ScreeningPost$inboundSchema,
} from "./screening-post.js";
import {
  ScreeningProfile,
  ScreeningProfile$inboundSchema,
} from "./screening-profile.js";

/**
 * Everything known about one attendee, and where else in the environment they appear.
 */
export type AttendeeReport = {
  /**
   * An attendee and where their screening and review stand.
   */
  attendee: Attendee;
  /**
   * The accounts the latest screening matched, with how each was matched.
   */
  profiles: Array<ScreeningProfile>;
  /**
   * What the latest screening flagged, most severe first, each citing its evidence.
   */
  findings: Array<ScreeningFinding>;
  /**
   * The posts the findings cite.
   */
  posts: Array<ScreeningPost>;
  /**
   * The images and videos the findings cite.
   */
  media: Array<ScreeningMedia>;
  /**
   * Every recorded decision, oldest first.
   */
  reviews: Array<AttendeeReview>;
  /**
   * What the signup check's lookups found for an attendee: account presence for the email, phone and usernames (the attendee's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.
   */
  lookup?: ScreeningLookup | undefined;
  /**
   * Where else in the environment the attendee appears, read live from those events: deleting one removes it here.
   */
  otherEvents: OtherEvents;
};

/** @internal */
export const AttendeeReport$inboundSchema: z.ZodMiniType<
  AttendeeReport,
  unknown
> = z.pipe(
  z.object({
    attendee: Attendee$inboundSchema,
    profiles: z.array(ScreeningProfile$inboundSchema),
    findings: z.array(ScreeningFinding$inboundSchema),
    posts: z.array(ScreeningPost$inboundSchema),
    media: z.array(ScreeningMedia$inboundSchema),
    reviews: z.array(AttendeeReview$inboundSchema),
    lookup: types.optional(ScreeningLookup$inboundSchema),
    other_events: OtherEvents$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "other_events": "otherEvents",
    });
  }),
);

export function attendeeReportFromJSON(
  jsonString: string,
): SafeParseResult<AttendeeReport, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttendeeReport$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttendeeReport' from JSON`,
  );
}
