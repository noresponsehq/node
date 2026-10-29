import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

export type ReviewCommentRequest = {
  expectedVersion: number;
  body: string;
};

/** @internal */
export type ReviewCommentRequest$Outbound = {
  expected_version: number;
  body: string;
};

/** @internal */
export const ReviewCommentRequest$outboundSchema: z.ZodMiniType<
  ReviewCommentRequest$Outbound,
  ReviewCommentRequest
> = z.pipe(
  z.object({
    expectedVersion: z.int(),
    body: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      expectedVersion: "expected_version",
    });
  }),
);

export function reviewCommentRequestToJSON(
  reviewCommentRequest: ReviewCommentRequest,
): string {
  return JSON.stringify(
    ReviewCommentRequest$outboundSchema.parse(reviewCommentRequest),
  );
}
