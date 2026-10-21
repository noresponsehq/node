import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Why a signal or source did not produce a definite found/not_found. timed_out means the source missed the request deadline; a continuation may still settle it. deferred means the (source, identifier) pair is async-only and was not attempted on the synchronous path; a continuation settles it.
 */
export const FailureReason = {
  TimedOut: "timed_out",
  RateLimited: "rate_limited",
  Blocked: "blocked",
  SourceError: "source_error",
  Unavailable: "unavailable",
  Deferred: "deferred",
  InsufficientEvidence: "insufficient_evidence",
} as const;
/**
 * Why a signal or source did not produce a definite found/not_found. timed_out means the source missed the request deadline; a continuation may still settle it. deferred means the (source, identifier) pair is async-only and was not attempted on the synchronous path; a continuation settles it.
 */
export type FailureReason = OpenEnum<typeof FailureReason>;

/** @internal */
export const FailureReason$inboundSchema: z.ZodMiniType<
  FailureReason,
  unknown
> = openEnums.inboundSchema(FailureReason);
