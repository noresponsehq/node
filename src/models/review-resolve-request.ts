import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Conclusion, Conclusion$outboundSchema } from "./conclusion.js";

export type ReviewResolveRequest = {
  expectedVersion: number;
  expectedRiskVersion: number;
  conclusion: Conclusion;
  note: string;
};

/** @internal */
export type ReviewResolveRequest$Outbound = {
  expected_version: number;
  expected_risk_version: number;
  conclusion: string;
  note: string;
};

/** @internal */
export const ReviewResolveRequest$outboundSchema: z.ZodMiniType<
  ReviewResolveRequest$Outbound,
  ReviewResolveRequest
> = z.pipe(
  z.object({
    expectedVersion: z.int(),
    expectedRiskVersion: z.int(),
    conclusion: Conclusion$outboundSchema,
    note: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      expectedVersion: "expected_version",
      expectedRiskVersion: "expected_risk_version",
    });
  }),
);

export function reviewResolveRequestToJSON(
  reviewResolveRequest: ReviewResolveRequest,
): string {
  return JSON.stringify(
    ReviewResolveRequest$outboundSchema.parse(reviewResolveRequest),
  );
}
