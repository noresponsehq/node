import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Why a failed search found nothing: its sources did not answer, none could be asked, or it could not run before its attempts were spent.
 */
export const ErrorCode = {
  NotAnswered: "not_answered",
  NoSource: "no_source",
  WorkerAttemptsExhausted: "worker_attempts_exhausted",
} as const;
/**
 * Why a failed search found nothing: its sources did not answer, none could be asked, or it could not run before its attempts were spent.
 */
export type ErrorCode = OpenEnum<typeof ErrorCode>;

/** @internal */
export const ErrorCode$inboundSchema: z.ZodMiniType<ErrorCode, unknown> =
  openEnums.inboundSchema(ErrorCode);
