import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The recommended action: allow, step_up or review. Your application applies it.
 */
export const Recommendation = {
  Allow: "allow",
  StepUp: "step_up",
  Review: "review",
} as const;
/**
 * The recommended action: allow, step_up or review. Your application applies it.
 */
export type Recommendation = OpenEnum<typeof Recommendation>;

/** @internal */
export const Recommendation$inboundSchema: z.ZodMiniType<
  Recommendation,
  unknown
> = openEnums.inboundSchema(Recommendation);
/** @internal */
export const Recommendation$outboundSchema: z.ZodMiniType<
  string,
  Recommendation
> = openEnums.outboundSchema(Recommendation);
