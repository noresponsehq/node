import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CommentReviewRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  reviewId: string;
  body: models.ReviewCommentRequest;
};

export type CommentReviewResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ReviewComment;
};

/** @internal */
export type CommentReviewRequest$Outbound = {
  workspace_id: string;
  environment: string;
  review_id: string;
  body: models.ReviewCommentRequest$Outbound;
};

/** @internal */
export const CommentReviewRequest$outboundSchema: z.ZodMiniType<
  CommentReviewRequest$Outbound,
  CommentReviewRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    reviewId: z.string(),
    body: models.ReviewCommentRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      reviewId: "review_id",
    });
  }),
);

export function commentReviewRequestToJSON(
  commentReviewRequest: CommentReviewRequest,
): string {
  return JSON.stringify(
    CommentReviewRequest$outboundSchema.parse(commentReviewRequest),
  );
}

/** @internal */
export const CommentReviewResponse$inboundSchema: z.ZodMiniType<
  CommentReviewResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ReviewComment$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function commentReviewResponseFromJSON(
  jsonString: string,
): SafeParseResult<CommentReviewResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CommentReviewResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CommentReviewResponse' from JSON`,
  );
}
