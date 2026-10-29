import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Priority, Priority$outboundSchema } from "./priority.js";
import {
  ReviewUpdateRequestStatus,
  ReviewUpdateRequestStatus$outboundSchema,
} from "./review-update-request-status.js";

export type ReviewUpdateRequest = {
  expectedVersion: number;
  status?: ReviewUpdateRequestStatus | undefined;
  priority?: Priority | undefined;
  assignee?: string | null | undefined;
};

/** @internal */
export type ReviewUpdateRequest$Outbound = {
  expected_version: number;
  status?: string | undefined;
  priority?: string | undefined;
  assignee?: string | null | undefined;
};

/** @internal */
export const ReviewUpdateRequest$outboundSchema: z.ZodMiniType<
  ReviewUpdateRequest$Outbound,
  ReviewUpdateRequest
> = z.pipe(
  z.object({
    expectedVersion: z.int(),
    status: z.optional(ReviewUpdateRequestStatus$outboundSchema),
    priority: z.optional(Priority$outboundSchema),
    assignee: z.optional(z.nullable(z.string())),
  }),
  z.transform((v) => {
    return remap$(v, {
      expectedVersion: "expected_version",
    });
  }),
);

export function reviewUpdateRequestToJSON(
  reviewUpdateRequest: ReviewUpdateRequest,
): string {
  return JSON.stringify(
    ReviewUpdateRequest$outboundSchema.parse(reviewUpdateRequest),
  );
}
