import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Why a lane did not settle. deferred means the lane is asynchronous and still running; a continuation settles it. timed_out means the lane missed its deadline. insufficient_evidence is a settled inconclusive signal rather than an incomplete lane.
 */
export const IncompleteReason = {
  TimedOut: "timed_out",
  RateLimited: "rate_limited",
  Blocked: "blocked",
  SourceError: "source_error",
  Unavailable: "unavailable",
  Deferred: "deferred",
} as const;
/**
 * Why a lane did not settle. deferred means the lane is asynchronous and still running; a continuation settles it. timed_out means the lane missed its deadline. insufficient_evidence is a settled inconclusive signal rather than an incomplete lane.
 */
export type IncompleteReason = OpenEnum<typeof IncompleteReason>;

/** @internal */
export const IncompleteReason$inboundSchema: z.ZodMiniType<
  IncompleteReason,
  unknown
> = openEnums.inboundSchema(IncompleteReason);
