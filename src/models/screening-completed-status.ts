import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * completed reached every person; partial left some not fully covered (partial_coverage); failed covered nobody.
 */
export const ScreeningCompletedStatus = {
  Completed: "completed",
  Partial: "partial",
  Failed: "failed",
} as const;
/**
 * completed reached every person; partial left some not fully covered (partial_coverage); failed covered nobody.
 */
export type ScreeningCompletedStatus = ClosedEnum<
  typeof ScreeningCompletedStatus
>;

/** @internal */
export const ScreeningCompletedStatus$inboundSchema: z.ZodMiniEnum<
  typeof ScreeningCompletedStatus
> = z.enum(ScreeningCompletedStatus);
/** @internal */
export const ScreeningCompletedStatus$outboundSchema: z.ZodMiniEnum<
  typeof ScreeningCompletedStatus
> = ScreeningCompletedStatus$inboundSchema;
