import * as z from "zod/v4-mini";
import {
  AttendeeDecision,
  AttendeeDecision$outboundSchema,
} from "./attendee-decision.js";

/**
 * Records a decision on an attendee.
 */
export type AttendeeReviewRequest = {
  decision: AttendeeDecision;
  /**
   * Why, for the venue team and later reviewers.
   */
  note?: string | undefined;
};

/** @internal */
export type AttendeeReviewRequest$Outbound = {
  decision: string;
  note?: string | undefined;
};

/** @internal */
export const AttendeeReviewRequest$outboundSchema: z.ZodMiniType<
  AttendeeReviewRequest$Outbound,
  AttendeeReviewRequest
> = z.object({
  decision: AttendeeDecision$outboundSchema,
  note: z.optional(z.string()),
});

export function attendeeReviewRequestToJSON(
  attendeeReviewRequest: AttendeeReviewRequest,
): string {
  return JSON.stringify(
    AttendeeReviewRequest$outboundSchema.parse(attendeeReviewRequest),
  );
}
