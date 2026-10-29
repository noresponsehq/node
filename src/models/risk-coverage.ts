import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Counts of planned source-identifier pairs by evidence outcome, deduplicated across signals and incomplete entries. These counts do not measure identity agreement or prove that processing is still running. A lane that was not searched is not an answered source.
 */
export type RiskCoverage = {
  /**
   * Source-identifier pairs that gave a definite found or not_found answer.
   */
  answered: number;
  /**
   * Source-identifier pairs that could not answer, including unsupported coverage markers and source failures. Read detailed signals to distinguish Not covered from Failed.
   */
  failed: number;
  /**
   * Source-identifier pairs with deferred or timed_out evidence. A terminal timeout can remain here after processing finishes; use assessment status and continuation metadata to determine whether work is still running.
   */
  pending: number;
};

/** @internal */
export const RiskCoverage$inboundSchema: z.ZodMiniType<RiskCoverage, unknown> =
  z.object({
    answered: types.number(),
    failed: types.number(),
    pending: types.number(),
  });
/** @internal */
export type RiskCoverage$Outbound = {
  answered: number;
  failed: number;
  pending: number;
};

/** @internal */
export const RiskCoverage$outboundSchema: z.ZodMiniType<
  RiskCoverage$Outbound,
  RiskCoverage
> = z.object({
  answered: z.int(),
  failed: z.int(),
  pending: z.int(),
});

export function riskCoverageToJSON(riskCoverage: RiskCoverage): string {
  return JSON.stringify(RiskCoverage$outboundSchema.parse(riskCoverage));
}
export function riskCoverageFromJSON(
  jsonString: string,
): SafeParseResult<RiskCoverage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskCoverage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskCoverage' from JSON`,
  );
}
