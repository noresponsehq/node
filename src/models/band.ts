import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const Band = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Critical: "critical",
} as const;
export type Band = OpenEnum<typeof Band>;

/** @internal */
export const Band$inboundSchema: z.ZodMiniType<Band, unknown> = openEnums
  .inboundSchema(Band);
/** @internal */
export const Band$outboundSchema: z.ZodMiniType<string, Band> = openEnums
  .outboundSchema(Band);
