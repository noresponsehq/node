import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The list action captured with the first answer. none means no matching entry was found. For retained_first_answers an absent field means the older assessment did not capture list state; this remains a separate group.
 */
export const AggregateGroupListMatch = {
  Block: "block",
  Allow: "allow",
  None: "none",
} as const;
/**
 * The list action captured with the first answer. none means no matching entry was found. For retained_first_answers an absent field means the older assessment did not capture list state; this remains a separate group.
 */
export type AggregateGroupListMatch = OpenEnum<typeof AggregateGroupListMatch>;

/** @internal */
export const AggregateGroupListMatch$inboundSchema: z.ZodMiniType<
  AggregateGroupListMatch,
  unknown
> = openEnums.inboundSchema(AggregateGroupListMatch);
