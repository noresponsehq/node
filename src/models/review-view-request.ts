import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Filter, Filter$Outbound, Filter$outboundSchema } from "./filter.js";

export type ReviewViewRequest = {
  name: string;
  shared: boolean;
  expectedVersion?: number | undefined;
  filter: Filter;
};

/** @internal */
export type ReviewViewRequest$Outbound = {
  name: string;
  shared: boolean;
  expected_version?: number | undefined;
  filter: Filter$Outbound;
};

/** @internal */
export const ReviewViewRequest$outboundSchema: z.ZodMiniType<
  ReviewViewRequest$Outbound,
  ReviewViewRequest
> = z.pipe(
  z.object({
    name: z.string(),
    shared: z.boolean(),
    expectedVersion: z.optional(z.int()),
    filter: Filter$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      expectedVersion: "expected_version",
    });
  }),
);

export function reviewViewRequestToJSON(
  reviewViewRequest: ReviewViewRequest,
): string {
  return JSON.stringify(
    ReviewViewRequest$outboundSchema.parse(reviewViewRequest),
  );
}
