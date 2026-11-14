import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The person's role in the group: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: a person without one has no role, not guest. A later row naming the same person replaces it, and a change of role alone keeps the person's screening results.
 */
export const PersonRole = {
  Guest: "guest",
  Crew: "crew",
  Vendor: "vendor",
  Press: "press",
} as const;
/**
 * The person's role in the group: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: a person without one has no role, not guest. A later row naming the same person replaces it, and a change of role alone keeps the person's screening results.
 */
export type PersonRole = OpenEnum<typeof PersonRole>;

/** @internal */
export const PersonRole$inboundSchema: z.ZodMiniType<PersonRole, unknown> =
  openEnums.inboundSchema(PersonRole);
/** @internal */
export const PersonRole$outboundSchema: z.ZodMiniType<string, PersonRole> =
  openEnums.outboundSchema(PersonRole);
