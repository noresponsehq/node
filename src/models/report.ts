import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { ResultStatus, ResultStatus$inboundSchema } from "./result-status.js";
import { Thresholds, Thresholds$inboundSchema } from "./thresholds.js";

export type ReportScope = {};

export type Report = {
  evaluatorVersion: "identity-threshold-evaluator-v2";
  inputSha256: string;
  cohortSha256: string;
  status: ResultStatus;
  candidate: Thresholds;
  scope: ReportScope;
};

/** @internal */
export const ReportScope$inboundSchema: z.ZodMiniType<ReportScope, unknown> = z
  .object({});

export function reportScopeFromJSON(
  jsonString: string,
): SafeParseResult<ReportScope, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReportScope$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReportScope' from JSON`,
  );
}

/** @internal */
export const Report$inboundSchema: z.ZodMiniType<Report, unknown> = z.pipe(
  z.object({
    evaluator_version: types.literal("identity-threshold-evaluator-v2"),
    input_sha256: types.string(),
    cohort_sha256: types.string(),
    status: ResultStatus$inboundSchema,
    candidate: Thresholds$inboundSchema,
    scope: z.lazy(() => ReportScope$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "evaluator_version": "evaluatorVersion",
      "input_sha256": "inputSha256",
      "cohort_sha256": "cohortSha256",
    });
  }),
);

export function reportFromJSON(
  jsonString: string,
): SafeParseResult<Report, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Report$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Report' from JSON`,
  );
}
