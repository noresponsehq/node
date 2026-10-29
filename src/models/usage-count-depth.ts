import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * assessments only.
 */
export const UsageCountDepth = {
  Quick: "quick",
  Full: "full",
} as const;
/**
 * assessments only.
 */
export type UsageCountDepth = OpenEnum<typeof UsageCountDepth>;

/** @internal */
export const UsageCountDepth$inboundSchema: z.ZodMiniType<
  UsageCountDepth,
  unknown
> = openEnums.inboundSchema(UsageCountDepth);
/** @internal */
export const UsageCountDepth$outboundSchema: z.ZodMiniType<
  string,
  UsageCountDepth
> = openEnums.outboundSchema(UsageCountDepth);
