import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

export const ListPeopleBand = {
  Critical: "critical",
  High: "high",
  Moderate: "moderate",
  Low: "low",
  Info: "info",
  None: "none",
} as const;
export type ListPeopleBand = ClosedEnum<typeof ListPeopleBand>;

/** @internal */
export const ListPeopleBand$outboundSchema: z.ZodMiniEnum<
  typeof ListPeopleBand
> = z.enum(ListPeopleBand);
