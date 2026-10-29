import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The period each count covers: an hour, or a day or a week (from Monday) in time_zone. Hour buckets are whole UTC hours in any time zone.
 */
export const Bucket = {
  Hour: "hour",
  Day: "day",
  Week: "week",
} as const;
/**
 * The period each count covers: an hour, or a day or a week (from Monday) in time_zone. Hour buckets are whole UTC hours in any time zone.
 */
export type Bucket = OpenEnum<typeof Bucket>;

/** @internal */
export const Bucket$inboundSchema: z.ZodMiniType<Bucket, unknown> = openEnums
  .inboundSchema(Bucket);
/** @internal */
export const Bucket$outboundSchema: z.ZodMiniType<string, Bucket> = openEnums
  .outboundSchema(Bucket);
