import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

export const InvestigationCompletedStatus = {
  Completed: "completed",
  Partial: "partial",
  Failed: "failed",
  Cancelled: "cancelled",
} as const;
export type InvestigationCompletedStatus = ClosedEnum<
  typeof InvestigationCompletedStatus
>;

/** @internal */
export const InvestigationCompletedStatus$inboundSchema: z.ZodMiniEnum<
  typeof InvestigationCompletedStatus
> = z.enum(InvestigationCompletedStatus);
/** @internal */
export const InvestigationCompletedStatus$outboundSchema: z.ZodMiniEnum<
  typeof InvestigationCompletedStatus
> = InvestigationCompletedStatus$inboundSchema;
