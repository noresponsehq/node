import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import {
  AttendeeReview,
  AttendeeReview$inboundSchema,
} from "./attendee-review.js";
import { Attendee, Attendee$inboundSchema } from "./attendee.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningFinding,
  ScreeningFinding$inboundSchema,
} from "./screening-finding.js";
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
 * Everything known about one attendee.
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
};

/** @internal */
export const AttendeeReport$inboundSchema: z.ZodMiniType<
  AttendeeReport,
  unknown
> = z.object({
  attendee: Attendee$inboundSchema,
  profiles: z.array(ScreeningProfile$inboundSchema),
  findings: z.array(ScreeningFinding$inboundSchema),
  posts: z.array(ScreeningPost$inboundSchema),
  media: z.array(ScreeningMedia$inboundSchema),
  reviews: z.array(AttendeeReview$inboundSchema),
});

export function attendeeReportFromJSON(
  jsonString: string,
): SafeParseResult<AttendeeReport, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttendeeReport$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttendeeReport' from JSON`,
  );
}
