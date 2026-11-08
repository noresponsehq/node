import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * partial finished with some attendees not covered; attendees_failed counts them.
 */
export const ScreeningStatus = {
  Queued: "queued",
  Running: "running",
  Completed: "completed",
  Partial: "partial",
  Failed: "failed",
  Cancelled: "cancelled",
} as const;
/**
 * partial finished with some attendees not covered; attendees_failed counts them.
 */
export type ScreeningStatus = OpenEnum<typeof ScreeningStatus>;

/** @internal */
export const ScreeningStatus$inboundSchema: z.ZodMiniType<
  ScreeningStatus,
  unknown
> = openEnums.inboundSchema(ScreeningStatus);
