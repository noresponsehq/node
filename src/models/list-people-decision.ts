import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

export const ListPeopleDecision = {
  Cleared: "cleared",
  Watch: "watch",
  Escalated: "escalated",
  Undecided: "undecided",
} as const;
export type ListPeopleDecision = ClosedEnum<typeof ListPeopleDecision>;

/** @internal */
export const ListPeopleDecision$outboundSchema: z.ZodMiniEnum<
  typeof ListPeopleDecision
> = z.enum(ListPeopleDecision);
