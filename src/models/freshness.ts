import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Freshness class of the evidence behind a signal. unknown whenever no evidence was obtained.
 */
export const Freshness = {
  Fresh: "fresh",
  Stale: "stale",
  Unknown: "unknown",
} as const;
/**
 * Freshness class of the evidence behind a signal. unknown whenever no evidence was obtained.
 */
export type Freshness = OpenEnum<typeof Freshness>;

/** @internal */
export const Freshness$inboundSchema: z.ZodMiniType<Freshness, unknown> =
  openEnums.inboundSchema(Freshness);
