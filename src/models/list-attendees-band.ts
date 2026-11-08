import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

export const ListAttendeesBand = {
  Critical: "critical",
  High: "high",
  Moderate: "moderate",
  Low: "low",
  Info: "info",
  None: "none",
} as const;
export type ListAttendeesBand = ClosedEnum<typeof ListAttendeesBand>;

/** @internal */
export const ListAttendeesBand$outboundSchema: z.ZodMiniEnum<
  typeof ListAttendeesBand
> = z.enum(ListAttendeesBand);
