import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Handle, Handle$inboundSchema } from "./handle.js";

export type WorkspacePerson = {
  /**
   * Your reference for this person within the workspace environment. Only an explicit reference or person_id can reuse an existing person.
   */
  externalId?: string | undefined;
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
  /**
   * Accounts the person is known to hold, at most 20.
   */
  handles?: Array<Handle> | undefined;
  id: string;
  createdAt: string;
  updatedAt: string;
  /**
   * The time the workspace retention policy removes this person, their evidence and investigation history. Shortening workspace retention can move this time earlier.
   */
  expiresAt: string;
};

/** @internal */
export const WorkspacePerson$inboundSchema: z.ZodMiniType<
  WorkspacePerson,
  unknown
> = z.pipe(
  z.object({
    external_id: types.optional(types.string()),
    name: types.optional(types.string()),
    email: types.optional(types.string()),
    phone: types.optional(types.string()),
    company: types.optional(types.string()),
    city: types.optional(types.string()),
    username: types.optional(types.string()),
    handles: types.optional(z.array(Handle$inboundSchema)),
    id: types.string(),
    created_at: types.string(),
    updated_at: types.string(),
    expires_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "external_id": "externalId",
      "created_at": "createdAt",
      "updated_at": "updatedAt",
      "expires_at": "expiresAt",
    });
  }),
);

export function workspacePersonFromJSON(
  jsonString: string,
): SafeParseResult<WorkspacePerson, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkspacePerson$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkspacePerson' from JSON`,
  );
}
