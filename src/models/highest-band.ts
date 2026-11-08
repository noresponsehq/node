import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const HighestBand = {
  Critical: "critical",
  High: "high",
  Moderate: "moderate",
  Low: "low",
  Info: "info",
} as const;
export type HighestBand = OpenEnum<typeof HighestBand>;

/** @internal */
export const HighestBand$inboundSchema: z.ZodMiniType<HighestBand, unknown> =
  openEnums.inboundSchema(HighestBand);
