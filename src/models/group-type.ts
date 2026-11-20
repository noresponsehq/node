import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * What the group's people share: an event, an organisation, a place or another attribute.
 */
export const GroupType = {
  Event: "event",
  Organisation: "organisation",
  Place: "place",
  Custom: "custom",
} as const;
/**
 * What the group's people share: an event, an organisation, a place or another attribute.
 */
export type GroupType = OpenEnum<typeof GroupType>;

/** @internal */
export const GroupType$inboundSchema: z.ZodMiniType<GroupType, unknown> =
  openEnums.inboundSchema(GroupType);
/** @internal */
export const GroupType$outboundSchema: z.ZodMiniType<string, GroupType> =
  openEnums.outboundSchema(GroupType);
