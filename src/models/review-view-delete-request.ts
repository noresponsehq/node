import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

export type ReviewViewDeleteRequest = {
  expectedVersion: number;
};

/** @internal */
export type ReviewViewDeleteRequest$Outbound = {
  expected_version: number;
};

/** @internal */
export const ReviewViewDeleteRequest$outboundSchema: z.ZodMiniType<
  ReviewViewDeleteRequest$Outbound,
  ReviewViewDeleteRequest
> = z.pipe(
  z.object({
    expectedVersion: z.int(),
  }),
  z.transform((v) => {
    return remap$(v, {
      expectedVersion: "expected_version",
    });
  }),
);

export function reviewViewDeleteRequestToJSON(
  reviewViewDeleteRequest: ReviewViewDeleteRequest,
): string {
  return JSON.stringify(
    ReviewViewDeleteRequest$outboundSchema.parse(reviewViewDeleteRequest),
  );
}
