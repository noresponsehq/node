import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const AttendeeDecision = {
  Cleared: "cleared",
  Watch: "watch",
  Escalated: "escalated",
} as const;
export type AttendeeDecision = OpenEnum<typeof AttendeeDecision>;

/** @internal */
export const AttendeeDecision$inboundSchema: z.ZodMiniType<
  AttendeeDecision,
  unknown
> = openEnums.inboundSchema(AttendeeDecision);
/** @internal */
export const AttendeeDecision$outboundSchema: z.ZodMiniType<
  string,
  AttendeeDecision
> = openEnums.outboundSchema(AttendeeDecision);
