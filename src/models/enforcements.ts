import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Coverage, Coverage$inboundSchema } from "./coverage.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Retained customer enforcement report rows created in [from,to), one row per account/risk_version/flow/action. A later applied report can replace failed at the original created_at; retries are not additional attempts here. applied_coverage divides reported_applied by report rows, including explicit action none; it is not independently verified execution, all requested actions, or prevented fraud. Unreported actions are unknown.
 */
export type Enforcements = {
  population: "retained_enforcement_reports_by_created_at";
  denominator: number;
  accounts: number;
  reportedApplied: number;
  reportedFailed: number;
  /**
   * Counts only; a zero denominator means no eligible retained records and does not imply a zero rate.
   */
  appliedCoverage: Coverage;
};

/** @internal */
export const Enforcements$inboundSchema: z.ZodMiniType<Enforcements, unknown> =
  z.pipe(
    z.object({
      population: types.literal("retained_enforcement_reports_by_created_at"),
      denominator: types.number(),
      accounts: types.number(),
      reported_applied: types.number(),
      reported_failed: types.number(),
      applied_coverage: Coverage$inboundSchema,
    }),
    z.transform((v) => {
      return remap$(v, {
        "reported_applied": "reportedApplied",
        "reported_failed": "reportedFailed",
        "applied_coverage": "appliedCoverage",
      });
    }),
  );

export function enforcementsFromJSON(
  jsonString: string,
): SafeParseResult<Enforcements, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Enforcements$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Enforcements' from JSON`,
  );
}
