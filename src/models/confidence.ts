import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Ordinal confidence in the recommendation under the current policy: low, medium, high or unavailable.
 */
export const Confidence = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Unavailable: "unavailable",
} as const;
/**
 * Ordinal confidence in the recommendation under the current policy: low, medium, high or unavailable.
 */
export type Confidence = OpenEnum<typeof Confidence>;

/** @internal */
export const Confidence$inboundSchema: z.ZodMiniType<Confidence, unknown> =
  openEnums.inboundSchema(Confidence);
/** @internal */
export const Confidence$outboundSchema: z.ZodMiniType<string, Confidence> =
  openEnums.outboundSchema(Confidence);
