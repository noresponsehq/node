import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PolicyEvaluation,
  PolicyEvaluation$inboundSchema,
} from "./policy-evaluation.js";
import { Report, Report$inboundSchema } from "./report.js";

/**
 * The evaluation report and its provenance. A no_change report cannot authorise publication.
 */
export type PolicyEvaluationResult = {
  evaluation: PolicyEvaluation;
  report: Report;
};

/** @internal */
export const PolicyEvaluationResult$inboundSchema: z.ZodMiniType<
  PolicyEvaluationResult,
  unknown
> = z.object({
  evaluation: PolicyEvaluation$inboundSchema,
  report: Report$inboundSchema,
});

export function policyEvaluationResultFromJSON(
  jsonString: string,
): SafeParseResult<PolicyEvaluationResult, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PolicyEvaluationResult$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PolicyEvaluationResult' from JSON`,
  );
}
