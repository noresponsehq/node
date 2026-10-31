import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Priority, Priority$outboundSchema } from "./priority.js";
import { ReviewStatus, ReviewStatus$outboundSchema } from "./review-status.js";

export type ReviewQueryRequest = {
  /**
   * Only reviews of this exact account in the authenticated workspace and environment. Applied before pagination.
   */
  accountId?: string | undefined;
  status?: ReviewStatus | undefined;
  priority?: Priority | undefined;
  assignee?: string | undefined;
  unassigned?: boolean | undefined;
  assigneePrincipalId?: string | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
};

/** @internal */
export type ReviewQueryRequest$Outbound = {
  account_id?: string | undefined;
  status?: string | undefined;
  priority?: string | undefined;
  assignee?: string | undefined;
  unassigned?: boolean | undefined;
  assignee_principal_id?: string | undefined;
  limit: number;
  cursor?: string | undefined;
};

/** @internal */
export const ReviewQueryRequest$outboundSchema: z.ZodMiniType<
  ReviewQueryRequest$Outbound,
  ReviewQueryRequest
> = z.pipe(
  z.object({
    accountId: z.optional(z.string()),
    status: z.optional(ReviewStatus$outboundSchema),
    priority: z.optional(Priority$outboundSchema),
    assignee: z.optional(z.string()),
    unassigned: z.optional(z.boolean()),
    assigneePrincipalId: z.optional(z.string()),
    limit: z._default(z.int(), 50),
    cursor: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      assigneePrincipalId: "assignee_principal_id",
    });
  }),
);

export function reviewQueryRequestToJSON(
  reviewQueryRequest: ReviewQueryRequest,
): string {
  return JSON.stringify(
    ReviewQueryRequest$outboundSchema.parse(reviewQueryRequest),
  );
}
