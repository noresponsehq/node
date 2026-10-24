import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Sources counted by state, not named.
 */
export type RiskCoverage = {
  /**
   * Sources that gave a definite answer.
   */
  answered: number;
  /**
   * Sources that could not answer.
   */
  failed: number;
  /**
   * Sources still being asked.
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
