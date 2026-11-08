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
import { Principal, Principal$inboundSchema } from "./principal.js";

/**
 * An event and its screening context.
 */
export type Event = {
  id: string;
  environment: AuditSettingsEnvironment;
  /**
   * The event's name.
   */
  name: string;
  /**
   * When the event starts.
   */
  startsAt: string;
  /**
   * When the event ends, at or after its start; the start when omitted.
   */
  endsAt: string;
  /**
   * Where the event is held.
   */
  venue?: string | undefined;
  /**
   * The organisation hosting the event.
   */
  host?: string | undefined;
  /**
   * The people the event protects.
   */
  principals: Array<Principal>;
  /**
   * Sensitive topics.
   */
  topics: Array<string>;
  /**
   * How many attendees the event holds.
   */
  attendees: number;
  /**
   * Goes up by one with every change.
   */
  version: number;
  /**
   * When raw collected items and unmatched candidate profiles are purged: 30 days after the event ends.
   */
  purgeAfter: string;
  /**
   * The member or key label that created the event.
   */
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

/** @internal */
export const Event$inboundSchema: z.ZodMiniType<Event, unknown> = z.pipe(
  z.object({
    id: types.string(),
    environment: AuditSettingsEnvironment$inboundSchema,
    name: types.string(),
    starts_at: types.string(),
    ends_at: types.string(),
    venue: types.optional(types.string()),
    host: types.optional(types.string()),
    principals: z.array(Principal$inboundSchema),
    topics: z.array(types.string()),
    attendees: types.number(),
    version: types.number(),
    purge_after: types.string(),
    created_by: types.string(),
    created_at: types.string(),
    updated_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "starts_at": "startsAt",
      "ends_at": "endsAt",
      "purge_after": "purgeAfter",
      "created_by": "createdBy",
      "created_at": "createdAt",
      "updated_at": "updatedAt",
    });
  }),
);

export function eventFromJSON(
  jsonString: string,
): SafeParseResult<Event, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Event$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Event' from JSON`,
  );
}
