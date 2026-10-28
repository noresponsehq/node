import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * How long after the assessment's creation the change was made.
 */
export const Delay = {
  Under10s: "under_10s",
  Under1m: "under_1m",
  Under10m: "under_10m",
  Under1h: "under_1h",
  Under1d: "under_1d",
  Over1d: "over_1d",
} as const;
/**
 * How long after the assessment's creation the change was made.
 */
export type Delay = OpenEnum<typeof Delay>;

/** @internal */
export const Delay$inboundSchema: z.ZodMiniType<Delay, unknown> = openEnums
  .inboundSchema(Delay);
