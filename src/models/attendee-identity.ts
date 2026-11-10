import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { AttendeeRole, AttendeeRole$outboundSchema } from "./attendee-role.js";
import { Handle, Handle$Outbound, Handle$outboundSchema } from "./handle.js";

/**
 * What you know about an attendee. Stored encrypted under the workspace's key.
 */
export type AttendeeIdentity = {
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
   * The attendee's role at the event: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: an attendee without one has no role, not guest. A later row naming the same attendee replaces it, and a change of role alone keeps the attendee's screening results.
   */
  role?: AttendeeRole | undefined;
};

/** @internal */
export type AttendeeIdentity$Outbound = {
  external_id?: string | undefined;
  name: string;
  email?: string | undefined;
  phone?: string | undefined;
  company?: string | undefined;
  city?: string | undefined;
  handles?: Array<Handle$Outbound> | undefined;
  role?: string | undefined;
};

/** @internal */
export const AttendeeIdentity$outboundSchema: z.ZodMiniType<
  AttendeeIdentity$Outbound,
  AttendeeIdentity
> = z.pipe(
  z.object({
    externalId: z.optional(z.string()),
    name: z.string(),
    email: z.optional(z.string()),
    phone: z.optional(z.string()),
    company: z.optional(z.string()),
    city: z.optional(z.string()),
    handles: z.optional(z.array(Handle$outboundSchema)),
    role: z.optional(AttendeeRole$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      externalId: "external_id",
    });
  }),
);

export function attendeeIdentityToJSON(
  attendeeIdentity: AttendeeIdentity,
): string {
  return JSON.stringify(
    AttendeeIdentity$outboundSchema.parse(attendeeIdentity),
  );
}
