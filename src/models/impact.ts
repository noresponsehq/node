import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The selected reason's served impact band. Requires reason.
 */
export const Impact = {
  None: "none",
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
/**
 * The selected reason's served impact band. Requires reason.
 */
export type Impact = OpenEnum<typeof Impact>;

/** @internal */
export const Impact$inboundSchema: z.ZodMiniType<Impact, unknown> = openEnums
  .inboundSchema(Impact);
/** @internal */
export const Impact$outboundSchema: z.ZodMiniType<string, Impact> = openEnums
  .outboundSchema(Impact);
