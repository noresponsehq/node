import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { GroupType, GroupType$outboundSchema } from "./group-type.js";
import {
  Principal,
  Principal$Outbound,
  Principal$outboundSchema,
} from "./principal.js";

/**
 * Creates an ongoing group or an event with optional dates.
 */
export type GroupRequest = {
  /**
   * The group's name.
   */
  name: string;
  /**
   * What the group's people share: an event, an organisation, a place or another attribute.
   */
  type?: GroupType | undefined;
  /**
   * The attribute its people share, such as the employer's or the place's name.
   */
  attribute?: string | undefined;
  /**
   * Optional event start; null for an ongoing group.
   */
  startsAt?: string | null | undefined;
  /**
   * Optional event end; requires starts_at and must be at or after it. Null when no end is set.
   */
  endsAt?: string | null | undefined;
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
  type?: string | undefined;
  attribute?: string | undefined;
  starts_at?: string | null | undefined;
  ends_at?: string | null | undefined;
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
    type: z.optional(GroupType$outboundSchema),
    attribute: z.optional(z.string()),
    startsAt: z.optional(z.nullable(z.string())),
    endsAt: z.optional(z.nullable(z.string())),
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
