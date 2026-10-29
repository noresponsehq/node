import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

export type PolicyEvaluationRequestLimits = {
  reviewRate: number;
  serverErrorRate: number;
  unavailableResultRate: number;
  p95Ms: number;
};

/** @internal */
export type PolicyEvaluationRequestLimits$Outbound = {
  review_rate: number;
  server_error_rate: number;
  unavailable_result_rate: number;
  p95_ms: number;
};

/** @internal */
export const PolicyEvaluationRequestLimits$outboundSchema: z.ZodMiniType<
  PolicyEvaluationRequestLimits$Outbound,
  PolicyEvaluationRequestLimits
> = z.pipe(
  z.object({
    reviewRate: z.number(),
    serverErrorRate: z.number(),
    unavailableResultRate: z.number(),
    p95Ms: z.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      reviewRate: "review_rate",
      serverErrorRate: "server_error_rate",
      unavailableResultRate: "unavailable_result_rate",
      p95Ms: "p95_ms",
    });
  }),
);

export function policyEvaluationRequestLimitsToJSON(
  policyEvaluationRequestLimits: PolicyEvaluationRequestLimits,
): string {
  return JSON.stringify(
    PolicyEvaluationRequestLimits$outboundSchema.parse(
      policyEvaluationRequestLimits,
    ),
  );
}
