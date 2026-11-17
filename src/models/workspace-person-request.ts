import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Handle, Handle$Outbound, Handle$outboundSchema } from "./handle.js";

export type WorkspacePersonRequest = {
  /**
   * Your reference for this person within the workspace environment. Only an explicit reference or person_id can reuse an existing person.
   */
  externalId?: string | undefined;
  /**
   * The person's full name.
   */
  name?: string | undefined;
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
   * A username the person uses, with no platform. A search looks it up on every platform that finds accounts by username.
   */
  username?: string | undefined;
  handles?: Array<Handle> | undefined;
  personId?: string | undefined;
};

/** @internal */
export type WorkspacePersonRequest$Outbound = {
  external_id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  company?: string | undefined;
  city?: string | undefined;
  username?: string | undefined;
  handles?: Array<Handle$Outbound> | undefined;
  person_id?: string | undefined;
};

/** @internal */
export const WorkspacePersonRequest$outboundSchema: z.ZodMiniType<
  WorkspacePersonRequest$Outbound,
  WorkspacePersonRequest
> = z.pipe(
  z.object({
    externalId: z.optional(z.string()),
    name: z.optional(z.string()),
    email: z.optional(z.string()),
    phone: z.optional(z.string()),
    company: z.optional(z.string()),
    city: z.optional(z.string()),
    username: z.optional(z.string()),
    handles: z.optional(z.array(Handle$outboundSchema)),
    personId: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      externalId: "external_id",
      personId: "person_id",
    });
  }),
);

export function workspacePersonRequestToJSON(
  workspacePersonRequest: WorkspacePersonRequest,
): string {
  return JSON.stringify(
    WorkspacePersonRequest$outboundSchema.parse(workspacePersonRequest),
  );
}
