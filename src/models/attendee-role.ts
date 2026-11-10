import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The attendee's role at the event: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: an attendee without one has no role, not guest. A later row naming the same attendee replaces it, and a change of role alone keeps the attendee's screening results.
 */
export const AttendeeRole = {
  Guest: "guest",
  Crew: "crew",
  Vendor: "vendor",
  Press: "press",
} as const;
/**
 * The attendee's role at the event: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: an attendee without one has no role, not guest. A later row naming the same attendee replaces it, and a change of role alone keeps the attendee's screening results.
 */
export type AttendeeRole = OpenEnum<typeof AttendeeRole>;

/** @internal */
export const AttendeeRole$inboundSchema: z.ZodMiniType<AttendeeRole, unknown> =
  openEnums.inboundSchema(AttendeeRole);
/** @internal */
export const AttendeeRole$outboundSchema: z.ZodMiniType<string, AttendeeRole> =
  openEnums.outboundSchema(AttendeeRole);
