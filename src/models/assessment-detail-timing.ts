import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AssessmentDetailTiming = {
  /**
   * The budget the server applied to the synchronous answer.
   */
  deadlineMs: number;
  /**
   * Server time from HTTP ingress to this revision of the assessment.
   */
  elapsedMs: number;
};

/** @internal */
export const AssessmentDetailTiming$inboundSchema: z.ZodMiniType<
  AssessmentDetailTiming,
  unknown
> = z.pipe(
  z.object({
    deadline_ms: types.number(),
    elapsed_ms: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "deadline_ms": "deadlineMs",
      "elapsed_ms": "elapsedMs",
    });
  }),
);
/** @internal */
export type AssessmentDetailTiming$Outbound = {
  deadline_ms: number;
  elapsed_ms: number;
};

/** @internal */
export const AssessmentDetailTiming$outboundSchema: z.ZodMiniType<
  AssessmentDetailTiming$Outbound,
  AssessmentDetailTiming
> = z.pipe(
  z.object({
    deadlineMs: z.int(),
    elapsedMs: z.int(),
  }),
  z.transform((v) => {
    return remap$(v, {
      deadlineMs: "deadline_ms",
      elapsedMs: "elapsed_ms",
    });
  }),
);

export function assessmentDetailTimingToJSON(
  assessmentDetailTiming: AssessmentDetailTiming,
): string {
  return JSON.stringify(
    AssessmentDetailTiming$outboundSchema.parse(assessmentDetailTiming),
  );
}
export function assessmentDetailTimingFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentDetailTiming, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentDetailTiming$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentDetailTiming' from JSON`,
  );
}
