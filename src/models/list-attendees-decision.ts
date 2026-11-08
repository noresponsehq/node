import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

export const ListAttendeesDecision = {
  Cleared: "cleared",
  Watch: "watch",
  Escalated: "escalated",
  Undecided: "undecided",
} as const;
export type ListAttendeesDecision = ClosedEnum<typeof ListAttendeesDecision>;

/** @internal */
export const ListAttendeesDecision$outboundSchema: z.ZodMiniEnum<
  typeof ListAttendeesDecision
> = z.enum(ListAttendeesDecision);
