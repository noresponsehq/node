import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Handle, Handle$Outbound, Handle$outboundSchema } from "./handle.js";
import { PersonRole, PersonRole$outboundSchema } from "./person-role.js";

/**
 * What you know about a person. Stored encrypted under the workspace's key.
 */
export type PersonIdentity = {
  /**
   * Your own id for the person, unique within the group. A later row with the same external id updates this person.
   */
  externalId?: string | undefined;
  /**
   * The person's full name.
   */
  name: string;
  /**
   * The person's email.
   */
  email?: string | undefined;
  /**
   * The person's phone in E.164 form.
   */
  phone?: string | undefined;
  /**
   * Where the person works.
   */
  company?: string | undefined;
  /**
   * Where the person lives.
   */
  city?: string | undefined;
  /**
   * Accounts the person is known to hold, at most 20.
   */
  handles?: Array<Handle> | undefined;
  /**
   * The person's role in the group: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: a person without one has no role, not guest. A later row naming the same person replaces it, and a change of role alone keeps the person's screening results.
   */
  role?: PersonRole | undefined;
};

/** @internal */
export type PersonIdentity$Outbound = {
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
export const PersonIdentity$outboundSchema: z.ZodMiniType<
  PersonIdentity$Outbound,
  PersonIdentity
> = z.pipe(
  z.object({
    externalId: z.optional(z.string()),
    name: z.string(),
    email: z.optional(z.string()),
    phone: z.optional(z.string()),
    company: z.optional(z.string()),
    city: z.optional(z.string()),
    handles: z.optional(z.array(Handle$outboundSchema)),
    role: z.optional(PersonRole$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      externalId: "external_id",
    });
  }),
);

export function personIdentityToJSON(personIdentity: PersonIdentity): string {
  return JSON.stringify(PersonIdentity$outboundSchema.parse(personIdentity));
}
