import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$inboundSchema,
} from "./audit-settings-environment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { GroupType, GroupType$inboundSchema } from "./group-type.js";
import { Principal, Principal$inboundSchema } from "./principal.js";

/**
 * A workspace group for a building, organization or event. Dates are optional and do not control person retention.
 */
export type Group = {
  id: string;
  environment: AuditSettingsEnvironment;
  /**
   * The group's name.
   */
  name: string;
  /**
   * What the group's people share: an event, an organisation, a place or another attribute.
   */
  type: GroupType;
  /**
   * The attribute its people share. Empty when none was given.
   */
  attribute: string;
  /**
   * Optional event start; null for an ongoing group.
   */
  startsAt: string | null;
  /**
   * Optional event end; requires starts_at and must be at or after it. Null when no end is set.
   */
  endsAt: string | null;
  /**
   * Where the group is held.
   */
  venue?: string | undefined;
  /**
   * The organisation hosting the group.
   */
  host?: string | undefined;
  /**
   * The people the group protects.
   */
  principals: Array<Principal>;
  /**
   * Sensitive topics.
   */
  topics: Array<string>;
  /**
   * How many people the group holds.
   */
  people: number;
  /**
   * Goes up by one with every change.
   */
  version: number;
  /**
   * The member or key label that created the group.
   */
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

/** @internal */
export const Group$inboundSchema: z.ZodMiniType<Group, unknown> = z.pipe(
  z.object({
    id: types.string(),
    environment: AuditSettingsEnvironment$inboundSchema,
    name: types.string(),
    type: GroupType$inboundSchema,
    attribute: types.string(),
    starts_at: types.nullable(types.string()),
    ends_at: types.nullable(types.string()),
    venue: types.optional(types.string()),
    host: types.optional(types.string()),
    principals: z.array(Principal$inboundSchema),
    topics: z.array(types.string()),
    people: types.number(),
    version: types.number(),
    created_by: types.string(),
    created_at: types.string(),
    updated_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "starts_at": "startsAt",
      "ends_at": "endsAt",
      "created_by": "createdBy",
      "created_at": "createdAt",
      "updated_at": "updatedAt",
    });
  }),
);

export function groupFromJSON(
  jsonString: string,
): SafeParseResult<Group, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Group$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Group' from JSON`,
  );
}
