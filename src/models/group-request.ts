import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  Principal,
  Principal$Outbound,
  Principal$outboundSchema,
} from "./principal.js";

/**
 * Creates a group.
 */
export type GroupRequest = {
  /**
   * The group's name.
   */
  name: string;
  /**
   * When the group starts.
   */
  startsAt: string;
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
};

/** @internal */
export type GroupRequest$Outbound = {
  name: string;
  starts_at: string;
  ends_at?: string | undefined;
  venue?: string | undefined;
  host?: string | undefined;
  principals?: Array<Principal$Outbound> | undefined;
  topics?: Array<string> | undefined;
};

/** @internal */
export const GroupRequest$outboundSchema: z.ZodMiniType<
  GroupRequest$Outbound,
  GroupRequest
> = z.pipe(
  z.object({
    name: z.string(),
    startsAt: z.string(),
    endsAt: z.optional(z.string()),
    venue: z.optional(z.string()),
    host: z.optional(z.string()),
    principals: z.optional(z.array(Principal$outboundSchema)),
    topics: z.optional(z.array(z.string())),
  }),
  z.transform((v) => {
    return remap$(v, {
      startsAt: "starts_at",
      endsAt: "ends_at",
    });
  }),
);

export function groupRequestToJSON(groupRequest: GroupRequest): string {
  return JSON.stringify(GroupRequest$outboundSchema.parse(groupRequest));
}
