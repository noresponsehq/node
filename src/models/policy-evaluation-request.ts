import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  PolicyEvaluationRequestCosts,
  PolicyEvaluationRequestCosts$Outbound,
  PolicyEvaluationRequestCosts$outboundSchema,
} from "./policy-evaluation-request-costs.js";
import {
  PolicyEvaluationRequestLimits,
  PolicyEvaluationRequestLimits$Outbound,
  PolicyEvaluationRequestLimits$outboundSchema,
} from "./policy-evaluation-request-limits.js";
import {
  Thresholds,
  Thresholds$Outbound,
  Thresholds$outboundSchema,
} from "./thresholds.js";

export type PolicyEvaluationRequest = {
  expectedPolicyVersion: number;
  from: string;
  to: string;
  candidates: Array<Thresholds>;
  costs: PolicyEvaluationRequestCosts;
  limits: PolicyEvaluationRequestLimits;
  labelCollection: string;
  splitSeed: string;
};

/** @internal */
export type PolicyEvaluationRequest$Outbound = {
  expected_policy_version: number;
  from: string;
  to: string;
  candidates: Array<Thresholds$Outbound>;
  costs: PolicyEvaluationRequestCosts$Outbound;
  limits: PolicyEvaluationRequestLimits$Outbound;
  label_collection: string;
  split_seed: string;
};

/** @internal */
export const PolicyEvaluationRequest$outboundSchema: z.ZodMiniType<
  PolicyEvaluationRequest$Outbound,
  PolicyEvaluationRequest
> = z.pipe(
  z.object({
    expectedPolicyVersion: z.int(),
    from: z.string(),
    to: z.string(),
    candidates: z.array(Thresholds$outboundSchema),
    costs: PolicyEvaluationRequestCosts$outboundSchema,
    limits: PolicyEvaluationRequestLimits$outboundSchema,
    labelCollection: z.string(),
    splitSeed: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      expectedPolicyVersion: "expected_policy_version",
      labelCollection: "label_collection",
      splitSeed: "split_seed",
    });
  }),
);

export function policyEvaluationRequestToJSON(
  policyEvaluationRequest: PolicyEvaluationRequest,
): string {
  return JSON.stringify(
    PolicyEvaluationRequest$outboundSchema.parse(policyEvaluationRequest),
  );
}
