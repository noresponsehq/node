import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AssessmentTiming = {
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
export const AssessmentTiming$inboundSchema: z.ZodMiniType<
  AssessmentTiming,
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

export function assessmentTimingFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentTiming, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentTiming$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentTiming' from JSON`,
  );
}
