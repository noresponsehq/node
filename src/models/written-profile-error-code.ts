import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Present only when status is failed. no_writer: no profile writer serves this environment. refused: the model refused. not_written: the answer was not a profile, or no statement survived grounding. uncited_statement: a statement or lead cited a record the person does not hold. not_answered: the writer did not answer. worker_attempts_exhausted: the worker stopped retrying.
 */
export const WrittenProfileErrorCode = {
  NoWriter: "no_writer",
  Refused: "refused",
  NotWritten: "not_written",
  UncitedStatement: "uncited_statement",
  NotAnswered: "not_answered",
  WorkerAttemptsExhausted: "worker_attempts_exhausted",
} as const;
/**
 * Present only when status is failed. no_writer: no profile writer serves this environment. refused: the model refused. not_written: the answer was not a profile, or no statement survived grounding. uncited_statement: a statement or lead cited a record the person does not hold. not_answered: the writer did not answer. worker_attempts_exhausted: the worker stopped retrying.
 */
export type WrittenProfileErrorCode = OpenEnum<typeof WrittenProfileErrorCode>;

/** @internal */
export const WrittenProfileErrorCode$inboundSchema: z.ZodMiniType<
  WrittenProfileErrorCode,
  unknown
> = openEnums.inboundSchema(WrittenProfileErrorCode);
