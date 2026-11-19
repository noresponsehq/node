import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { StageTime, StageTime$inboundSchema } from "./stage-time.js";

/**
 * How long this search's latest attempt took, stage by stage. started_at minus the investigation's creation is the time spent queued or retrying.
 */
export type ScreeningCoverageTiming = {
  /**
   * When the attempt that wrote this result started.
   */
  startedAt: string;
  /**
   * Milliseconds from started_at to the end of the last stage listed.
   */
  totalMs: number;
  /**
   * Stages finished so far, in order. The result first written lists stages up to written; the settled result lists them all.
   */
  stages: Array<StageTime>;
};

/** @internal */
export const ScreeningCoverageTiming$inboundSchema: z.ZodMiniType<
  ScreeningCoverageTiming,
  unknown
> = z.pipe(
  z.object({
    started_at: types.string(),
    total_ms: types.number(),
    stages: z.array(StageTime$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "started_at": "startedAt",
      "total_ms": "totalMs",
    });
  }),
);

export function screeningCoverageTimingFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningCoverageTiming, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningCoverageTiming$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningCoverageTiming' from JSON`,
  );
}
