import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * How severe a finding is, most severe first.
 */
export const FindingBand = {
  Critical: "critical",
  High: "high",
  Moderate: "moderate",
  Low: "low",
  Info: "info",
} as const;
/**
 * How severe a finding is, most severe first.
 */
export type FindingBand = OpenEnum<typeof FindingBand>;

/** @internal */
export const FindingBand$inboundSchema: z.ZodMiniType<FindingBand, unknown> =
  openEnums.inboundSchema(FindingBand);
