import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const PersonDecision = {
  Cleared: "cleared",
  Watch: "watch",
  Escalated: "escalated",
} as const;
export type PersonDecision = OpenEnum<typeof PersonDecision>;

/** @internal */
export const PersonDecision$inboundSchema: z.ZodMiniType<
  PersonDecision,
  unknown
> = openEnums.inboundSchema(PersonDecision);
/** @internal */
export const PersonDecision$outboundSchema: z.ZodMiniType<
  string,
  PersonDecision
> = openEnums.outboundSchema(PersonDecision);
