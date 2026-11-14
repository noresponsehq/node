import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  Principal,
  Principal$Outbound,
  Principal$outboundSchema,
} from "./principal.js";

/**
 * Changes the fields it names; at least one besides expected_version.
 */
export type GroupUpdate = {
  /**
   * The group's name.
   */
  name?: string | undefined;
  /**
   * When the group starts.
   */
  startsAt?: string | undefined;
  /**
   * When the group ends, at or after its start; the start when omitted.
   */
  endsAt?: string | undefined;
  /**
   * Where the group is held.
   */
  venue?: string | undefined;
  /**
   * The organisation hosting the group.
   */
  host?: string | undefined;
  /**
   * The people the group protects, at most 20.
   */
  principals?: Array<Principal> | undefined;
  /**
   * Sensitive topics the screening reads posts against, at most 50.
   */
  topics?: Array<string> | undefined;
  /**
   * When present, the change applies only if the group is still at this version (409 group_conflict otherwise).
   */
  expectedVersion?: number | undefined;
};

/** @internal */
export type GroupUpdate$Outbound = {
  name?: string | undefined;
  starts_at?: string | undefined;
  ends_at?: string | undefined;
  venue?: string | undefined;
  host?: string | undefined;
  principals?: Array<Principal$Outbound> | undefined;
  topics?: Array<string> | undefined;
  expected_version?: number | undefined;
};

/** @internal */
export const GroupUpdate$outboundSchema: z.ZodMiniType<
  GroupUpdate$Outbound,
  GroupUpdate
> = z.pipe(
  z.object({
    name: z.optional(z.string()),
    startsAt: z.optional(z.string()),
    endsAt: z.optional(z.string()),
    venue: z.optional(z.string()),
    host: z.optional(z.string()),
    principals: z.optional(z.array(Principal$outboundSchema)),
    topics: z.optional(z.array(z.string())),
    expectedVersion: z.optional(z.int()),
  }),
  z.transform((v) => {
    return remap$(v, {
      startsAt: "starts_at",
      endsAt: "ends_at",
      expectedVersion: "expected_version",
    });
  }),
);

export function groupUpdateToJSON(groupUpdate: GroupUpdate): string {
  return JSON.stringify(GroupUpdate$outboundSchema.parse(groupUpdate));
}
