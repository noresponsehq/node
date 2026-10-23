import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.
 */
export const AccountDecision = {
  Allow: "allow",
  StepUp: "step_up",
  Review: "review",
  Block: "block",
} as const;
/**
 * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.
 */
export type AccountDecision = OpenEnum<typeof AccountDecision>;

/** @internal */
export const AccountDecision$inboundSchema: z.ZodMiniType<
  AccountDecision,
  unknown
> = openEnums.inboundSchema(AccountDecision);
