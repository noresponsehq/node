import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * first_answers uses anonymous counters that can include erased detail. retained_first_answers computes exact intersections over retained first answers within 31 days. Requests exceeding the 100000-record work budget are refused.
 */
export const Population = {
  FirstAnswers: "first_answers",
  RetainedFirstAnswers: "retained_first_answers",
} as const;
/**
 * first_answers uses anonymous counters that can include erased detail. retained_first_answers computes exact intersections over retained first answers within 31 days. Requests exceeding the 100000-record work budget are refused.
 */
export type Population = OpenEnum<typeof Population>;

/** @internal */
export const Population$inboundSchema: z.ZodMiniType<Population, unknown> =
  openEnums.inboundSchema(Population);
/** @internal */
export const Population$outboundSchema: z.ZodMiniType<string, Population> =
  openEnums.outboundSchema(Population);
