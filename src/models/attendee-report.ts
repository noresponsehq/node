import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import {
  AttendeeReview,
  AttendeeReview$inboundSchema,
} from "./attendee-review.js";
import { Attendee, Attendee$inboundSchema } from "./attendee.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type Profile = {};

export type Finding = {};

/**
 * Everything known about one attendee.
 */
export type AttendeeReport = {
  /**
   * An attendee and where their screening and review stand.
   */
  attendee: Attendee;
  /**
   * The accounts the screening matched, with how each was matched.
   */
  profiles: Array<Profile>;
  /**
   * What the screening flagged, with its evidence.
   */
  findings: Array<Finding>;
  /**
   * Every recorded decision, oldest first.
   */
  reviews: Array<AttendeeReview>;
};

/** @internal */
export const Profile$inboundSchema: z.ZodMiniType<Profile, unknown> = z.object(
  {},
);

export function profileFromJSON(
  jsonString: string,
): SafeParseResult<Profile, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Profile$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Profile' from JSON`,
  );
}

/** @internal */
export const Finding$inboundSchema: z.ZodMiniType<Finding, unknown> = z.object(
  {},
);

export function findingFromJSON(
  jsonString: string,
): SafeParseResult<Finding, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Finding$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Finding' from JSON`,
  );
}

/** @internal */
export const AttendeeReport$inboundSchema: z.ZodMiniType<
  AttendeeReport,
  unknown
> = z.object({
  attendee: Attendee$inboundSchema,
  profiles: z.array(z.lazy(() => Profile$inboundSchema)),
  findings: z.array(z.lazy(() => Finding$inboundSchema)),
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
