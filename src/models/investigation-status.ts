import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const InvestigationStatus = {
  Queued: "queued",
  Running: "running",
  Completed: "completed",
  Partial: "partial",
  Failed: "failed",
  Cancelled: "cancelled",
  Unknown: "unknown",
} as const;
export type InvestigationStatus = OpenEnum<typeof InvestigationStatus>;

/** @internal */
export const InvestigationStatus$inboundSchema: z.ZodMiniType<
  InvestigationStatus,
  unknown
> = openEnums.inboundSchema(InvestigationStatus);
