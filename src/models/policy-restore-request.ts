import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

/**
 * Publish a captured configuration as a new version. Version checks and publication are atomic. Longer retention does not revive expired records, and restored policy does not undo customer enforcement.
 */
export type PolicyRestoreRequest = {
  version: number;
  expectedPolicyVersion: number;
  changeReason: string;
};

/** @internal */
export type PolicyRestoreRequest$Outbound = {
  version: number;
  expected_policy_version: number;
  change_reason: string;
};

/** @internal */
export const PolicyRestoreRequest$outboundSchema: z.ZodMiniType<
  PolicyRestoreRequest$Outbound,
  PolicyRestoreRequest
> = z.pipe(
  z.object({
    version: z.int(),
    expectedPolicyVersion: z.int(),
    changeReason: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      expectedPolicyVersion: "expected_policy_version",
      changeReason: "change_reason",
    });
  }),
);

export function policyRestoreRequestToJSON(
  policyRestoreRequest: PolicyRestoreRequest,
): string {
  return JSON.stringify(
    PolicyRestoreRequest$outboundSchema.parse(policyRestoreRequest),
  );
}
