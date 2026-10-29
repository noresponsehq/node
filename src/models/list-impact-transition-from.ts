import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const ListImpactTransitionFrom = {
  None: "none",
  Allow: "allow",
  Block: "block",
} as const;
export type ListImpactTransitionFrom = OpenEnum<
  typeof ListImpactTransitionFrom
>;

/** @internal */
export const ListImpactTransitionFrom$inboundSchema: z.ZodMiniType<
  ListImpactTransitionFrom,
  unknown
> = openEnums.inboundSchema(ListImpactTransitionFrom);
