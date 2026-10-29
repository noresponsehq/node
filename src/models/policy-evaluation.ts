import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$inboundSchema,
} from "./audit-settings-environment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PolicyEvaluationStatus,
  PolicyEvaluationStatus$inboundSchema,
} from "./policy-evaluation-status.js";
import { ResultStatus, ResultStatus$inboundSchema } from "./result-status.js";

export type PolicyEvaluation = {
  id: string;
  environment: AuditSettingsEnvironment;
  status: PolicyEvaluationStatus;
  policyVersion: number;
  scoringPolicy: string;
  createdAt: string;
  expiresAt: string;
  capturedAt?: string | undefined;
  finishedAt?: string | undefined;
  accounts: number;
  requests: number;
  evaluatorVersion: "identity-threshold-evaluator-v2";
  evaluatorSha256: string;
  buildVersion?: string | undefined;
  resultStatus?: ResultStatus | undefined;
  errorCode?: string | undefined;
  publishedPolicyVersion?: number | undefined;
  manifestSha256?: string | undefined;
  inputSha256?: string | undefined;
  cohortSha256?: string | undefined;
  resultSha256?: string | undefined;
};

/** @internal */
export const PolicyEvaluation$inboundSchema: z.ZodMiniType<
  PolicyEvaluation,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    environment: AuditSettingsEnvironment$inboundSchema,
    status: PolicyEvaluationStatus$inboundSchema,
    policy_version: types.number(),
    scoring_policy: types.string(),
    created_at: types.string(),
    expires_at: types.string(),
    captured_at: types.optional(types.string()),
    finished_at: types.optional(types.string()),
    accounts: types.number(),
    requests: types.number(),
    evaluator_version: types.literal("identity-threshold-evaluator-v2"),
    evaluator_sha256: types.string(),
    build_version: types.optional(types.string()),
    result_status: types.optional(ResultStatus$inboundSchema),
    error_code: types.optional(types.string()),
    published_policy_version: types.optional(types.number()),
    manifest_sha256: types.optional(types.string()),
    input_sha256: types.optional(types.string()),
    cohort_sha256: types.optional(types.string()),
    result_sha256: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "policy_version": "policyVersion",
      "scoring_policy": "scoringPolicy",
      "created_at": "createdAt",
      "expires_at": "expiresAt",
      "captured_at": "capturedAt",
      "finished_at": "finishedAt",
      "evaluator_version": "evaluatorVersion",
      "evaluator_sha256": "evaluatorSha256",
      "build_version": "buildVersion",
      "result_status": "resultStatus",
      "error_code": "errorCode",
      "published_policy_version": "publishedPolicyVersion",
      "manifest_sha256": "manifestSha256",
      "input_sha256": "inputSha256",
      "cohort_sha256": "cohortSha256",
      "result_sha256": "resultSha256",
    });
  }),
);

export function policyEvaluationFromJSON(
  jsonString: string,
): SafeParseResult<PolicyEvaluation, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PolicyEvaluation$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PolicyEvaluation' from JSON`,
  );
}
