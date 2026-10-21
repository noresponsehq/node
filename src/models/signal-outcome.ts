import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.
 */
export const SignalOutcome = {
  Found: "found",
  NotFound: "not_found",
  Inconclusive: "inconclusive",
  Blocked: "blocked",
  Unavailable: "unavailable",
} as const;
/**
 * Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.
 */
export type SignalOutcome = OpenEnum<typeof SignalOutcome>;

/** @internal */
export const SignalOutcome$inboundSchema: z.ZodMiniType<
  SignalOutcome,
  unknown
> = openEnums.inboundSchema(SignalOutcome);
