import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * How often the person is investigated again: daily, weekly or monthly, counted from when the schedule was set; off runs no scheduled investigation.
 */
export const SchedulePeriod = {
  Daily: "daily",
  Weekly: "weekly",
  Monthly: "monthly",
  Off: "off",
} as const;
/**
 * How often the person is investigated again: daily, weekly or monthly, counted from when the schedule was set; off runs no scheduled investigation.
 */
export type SchedulePeriod = OpenEnum<typeof SchedulePeriod>;

/** @internal */
export const SchedulePeriod$inboundSchema: z.ZodMiniType<
  SchedulePeriod,
  unknown
> = openEnums.inboundSchema(SchedulePeriod);
/** @internal */
export const SchedulePeriod$outboundSchema: z.ZodMiniType<
  string,
  SchedulePeriod
> = openEnums.outboundSchema(SchedulePeriod);
