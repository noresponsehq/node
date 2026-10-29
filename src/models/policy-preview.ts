import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PolicyPreviewCoverage,
  PolicyPreviewCoverage$inboundSchema,
} from "./policy-preview-coverage.js";
import {
  PolicyPreviewTransition,
  PolicyPreviewTransition$inboundSchema,
} from "./policy-preview-transition.js";

/**
 * Exact threshold transitions among eligible retained first answers, newest first within the limit. Partial older revisions without a frozen hold snapshot are reported as unsupported. Preview leaves account state, outcomes and source evidence unchanged.
 */
export type PolicyPreview = {
  scope: "retained_first_answer_thresholds";
  policyVersion: number;
  from: string;
  to: string;
  retentionFrom: string;
  coverage: PolicyPreviewCoverage;
  changed: number;
  unchanged: number;
  transitions: Array<PolicyPreviewTransition>;
};

/** @internal */
export const PolicyPreview$inboundSchema: z.ZodMiniType<
  PolicyPreview,
  unknown
> = z.pipe(
  z.object({
    scope: types.literal("retained_first_answer_thresholds"),
    policy_version: types.number(),
    from: types.string(),
    to: types.string(),
    retention_from: types.string(),
    coverage: PolicyPreviewCoverage$inboundSchema,
    changed: types.number(),
    unchanged: types.number(),
    transitions: z.array(PolicyPreviewTransition$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "policy_version": "policyVersion",
      "retention_from": "retentionFrom",
    });
  }),
);

export function policyPreviewFromJSON(
  jsonString: string,
): SafeParseResult<PolicyPreview, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PolicyPreview$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PolicyPreview' from JSON`,
  );
}
