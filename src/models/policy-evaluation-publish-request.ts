import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  Thresholds,
  Thresholds$Outbound,
  Thresholds$outboundSchema,
} from "./thresholds.js";

export type PolicyEvaluationPublishRequest = {
  expectedPolicyVersion: number;
  manifestSha256: string;
  inputSha256: string;
  resultSha256: string;
  candidate: Thresholds;
  changeReason: string;
};

/** @internal */
export type PolicyEvaluationPublishRequest$Outbound = {
  expected_policy_version: number;
  manifest_sha256: string;
  input_sha256: string;
  result_sha256: string;
  candidate: Thresholds$Outbound;
  change_reason: string;
};

/** @internal */
export const PolicyEvaluationPublishRequest$outboundSchema: z.ZodMiniType<
  PolicyEvaluationPublishRequest$Outbound,
  PolicyEvaluationPublishRequest
> = z.pipe(
  z.object({
    expectedPolicyVersion: z.int(),
    manifestSha256: z.string(),
    inputSha256: z.string(),
    resultSha256: z.string(),
    candidate: Thresholds$outboundSchema,
    changeReason: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      expectedPolicyVersion: "expected_policy_version",
      manifestSha256: "manifest_sha256",
      inputSha256: "input_sha256",
      resultSha256: "result_sha256",
      changeReason: "change_reason",
    });
  }),
);

export function policyEvaluationPublishRequestToJSON(
  policyEvaluationPublishRequest: PolicyEvaluationPublishRequest,
): string {
  return JSON.stringify(
    PolicyEvaluationPublishRequest$outboundSchema.parse(
      policyEvaluationPublishRequest,
    ),
  );
}
