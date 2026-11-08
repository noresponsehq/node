import * as z from "zod/v4-mini";
import {
  AttendeeIdentity,
  AttendeeIdentity$Outbound,
  AttendeeIdentity$outboundSchema,
} from "./attendee-identity.js";

/**
 * Adds or updates 1 to 500 attendees. A row naming an existing attendee of the event (the same external_id, else the same email, else the same phone) updates it.
 */
export type AttendeeBatchRequest = {
  attendees: Array<AttendeeIdentity>;
};

/** @internal */
export type AttendeeBatchRequest$Outbound = {
  attendees: Array<AttendeeIdentity$Outbound>;
};

/** @internal */
export const AttendeeBatchRequest$outboundSchema: z.ZodMiniType<
  AttendeeBatchRequest$Outbound,
  AttendeeBatchRequest
> = z.object({
  attendees: z.array(AttendeeIdentity$outboundSchema),
});

export function attendeeBatchRequestToJSON(
  attendeeBatchRequest: AttendeeBatchRequest,
): string {
  return JSON.stringify(
    AttendeeBatchRequest$outboundSchema.parse(attendeeBatchRequest),
  );
}
