import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * How much of the planned evidence answered; it says nothing about risk.
 */
export const RiskConfidence = {
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
/**
 * How much of the planned evidence answered; it says nothing about risk.
 */
export type RiskConfidence = OpenEnum<typeof RiskConfidence>;

/** @internal */
export const RiskConfidence$inboundSchema: z.ZodMiniType<
  RiskConfidence,
  unknown
> = openEnums.inboundSchema(RiskConfidence);
/** @internal */
export const RiskConfidence$outboundSchema: z.ZodMiniType<
  string,
  RiskConfidence
> = openEnums.outboundSchema(RiskConfidence);
