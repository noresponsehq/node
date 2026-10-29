import * as z from "zod/v4-mini";

export type PolicyEvaluationCancelRequest = {};

/** @internal */
export type PolicyEvaluationCancelRequest$Outbound = {};

/** @internal */
export const PolicyEvaluationCancelRequest$outboundSchema: z.ZodMiniType<
  PolicyEvaluationCancelRequest$Outbound,
  PolicyEvaluationCancelRequest
> = z.object({});

export function policyEvaluationCancelRequestToJSON(
  policyEvaluationCancelRequest: PolicyEvaluationCancelRequest,
): string {
  return JSON.stringify(
    PolicyEvaluationCancelRequest$outboundSchema.parse(
      policyEvaluationCancelRequest,
    ),
  );
}
