import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * block decides block for the accounts the entry matches; allow decides allow. Block wins when both match.
 */
export const ListEntryAction = {
  Block: "block",
  Allow: "allow",
} as const;
/**
 * block decides block for the accounts the entry matches; allow decides allow. Block wins when both match.
 */
export type ListEntryAction = OpenEnum<typeof ListEntryAction>;

/** @internal */
export const ListEntryAction$inboundSchema: z.ZodMiniType<
  ListEntryAction,
  unknown
> = openEnums.inboundSchema(ListEntryAction);
/** @internal */
export const ListEntryAction$outboundSchema: z.ZodMiniType<
  string,
  ListEntryAction
> = openEnums.outboundSchema(ListEntryAction);
