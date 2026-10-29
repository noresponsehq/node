import * as z from "zod/v4-mini";
import { Cost, Cost$Outbound, Cost$outboundSchema } from "./cost.js";

export type PolicyEvaluationRequestCosts = {
  legitimate: Cost;
  abuse: Cost;
};

/** @internal */
export type PolicyEvaluationRequestCosts$Outbound = {
  legitimate: Cost$Outbound;
  abuse: Cost$Outbound;
};

/** @internal */
export const PolicyEvaluationRequestCosts$outboundSchema: z.ZodMiniType<
  PolicyEvaluationRequestCosts$Outbound,
  PolicyEvaluationRequestCosts
> = z.object({
  legitimate: Cost$outboundSchema,
  abuse: Cost$outboundSchema,
});

export function policyEvaluationRequestCostsToJSON(
  policyEvaluationRequestCosts: PolicyEvaluationRequestCosts,
): string {
  return JSON.stringify(
    PolicyEvaluationRequestCosts$outboundSchema.parse(
      policyEvaluationRequestCosts,
    ),
  );
}
