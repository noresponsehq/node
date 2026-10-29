import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PolicyEvaluation,
  PolicyEvaluation$inboundSchema,
} from "./policy-evaluation.js";

/**
 * Retained jobs, newest first. Follow next_before for another page.
 */
export type PolicyEvaluationList = {
  items: Array<PolicyEvaluation>;
  nextBefore?: string | undefined;
};

/** @internal */
export const PolicyEvaluationList$inboundSchema: z.ZodMiniType<
  PolicyEvaluationList,
  unknown
> = z.pipe(
  z.object({
    items: z.array(PolicyEvaluation$inboundSchema),
    next_before: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "next_before": "nextBefore",
    });
  }),
);

export function policyEvaluationListFromJSON(
  jsonString: string,
): SafeParseResult<PolicyEvaluationList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PolicyEvaluationList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PolicyEvaluationList' from JSON`,
  );
}
