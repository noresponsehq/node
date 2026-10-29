import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListReviewCommentsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  reviewId: string;
  limit?: number | undefined;
  cursor?: string | undefined;
};

export type ListReviewCommentsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ReviewCommentList;
};

/** @internal */
export type ListReviewCommentsRequest$Outbound = {
  workspace_id: string;
  environment: string;
  review_id: string;
  limit: number;
  cursor?: string | undefined;
};

/** @internal */
export const ListReviewCommentsRequest$outboundSchema: z.ZodMiniType<
  ListReviewCommentsRequest$Outbound,
  ListReviewCommentsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    reviewId: z.string(),
    limit: z._default(z.int(), 50),
    cursor: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      reviewId: "review_id",
    });
  }),
);

export function listReviewCommentsRequestToJSON(
  listReviewCommentsRequest: ListReviewCommentsRequest,
): string {
  return JSON.stringify(
    ListReviewCommentsRequest$outboundSchema.parse(listReviewCommentsRequest),
  );
}

/** @internal */
export const ListReviewCommentsResponse$inboundSchema: z.ZodMiniType<
  ListReviewCommentsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ReviewCommentList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listReviewCommentsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListReviewCommentsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListReviewCommentsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListReviewCommentsResponse' from JSON`,
  );
}
