import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * low 0-29, medium 30-59, high 60-84, critical 85-100.
 */
export const Band = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Critical: "critical",
} as const;
/**
 * low 0-29, medium 30-59, high 60-84, critical 85-100.
 */
export type Band = OpenEnum<typeof Band>;

/** @internal */
export const Band$inboundSchema: z.ZodMiniType<Band, unknown> = openEnums
  .inboundSchema(Band);
/** @internal */
export const Band$outboundSchema: z.ZodMiniType<string, Band> = openEnums
  .outboundSchema(Band);
