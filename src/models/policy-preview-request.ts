import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  PolicyPreviewRequestFlows,
  PolicyPreviewRequestFlows$Outbound,
  PolicyPreviewRequestFlows$outboundSchema,
} from "./policy-preview-request-flows.js";

/**
 * Side-effect-free threshold preview for at most 31 days. Retained first answers are evaluated at their exact frozen scores using the production threshold and hold rules. Changes to admission, source selection, depth or retention are not simulated.
 */
export type PolicyPreviewRequest = {
  expectedPolicyVersion: number;
  from: string;
  to: string;
  limit?: number | undefined;
  flows: PolicyPreviewRequestFlows;
};

/** @internal */
export type PolicyPreviewRequest$Outbound = {
  expected_policy_version: number;
  from: string;
  to: string;
  limit: number;
  flows: PolicyPreviewRequestFlows$Outbound;
};

/** @internal */
export const PolicyPreviewRequest$outboundSchema: z.ZodMiniType<
  PolicyPreviewRequest$Outbound,
  PolicyPreviewRequest
> = z.pipe(
  z.object({
    expectedPolicyVersion: z.int(),
    from: z.string(),
    to: z.string(),
    limit: z._default(z.int(), 1000),
    flows: PolicyPreviewRequestFlows$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      expectedPolicyVersion: "expected_policy_version",
    });
  }),
);

export function policyPreviewRequestToJSON(
  policyPreviewRequest: PolicyPreviewRequest,
): string {
  return JSON.stringify(
    PolicyPreviewRequest$outboundSchema.parse(policyPreviewRequest),
  );
}
