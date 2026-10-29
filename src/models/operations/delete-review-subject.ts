import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type DeleteReviewSubjectRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  reviewId: string;
  subjectId: string;
  body: models.ReviewViewDeleteRequest;
};

export type DeleteReviewSubjectResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Review;
};

/** @internal */
export type DeleteReviewSubjectRequest$Outbound = {
  workspace_id: string;
  environment: string;
  review_id: string;
  subject_id: string;
  body: models.ReviewViewDeleteRequest$Outbound;
};

/** @internal */
export const DeleteReviewSubjectRequest$outboundSchema: z.ZodMiniType<
  DeleteReviewSubjectRequest$Outbound,
  DeleteReviewSubjectRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    reviewId: z.string(),
    subjectId: z.string(),
    body: models.ReviewViewDeleteRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      reviewId: "review_id",
      subjectId: "subject_id",
    });
  }),
);

export function deleteReviewSubjectRequestToJSON(
  deleteReviewSubjectRequest: DeleteReviewSubjectRequest,
): string {
  return JSON.stringify(
    DeleteReviewSubjectRequest$outboundSchema.parse(deleteReviewSubjectRequest),
  );
}

/** @internal */
export const DeleteReviewSubjectResponse$inboundSchema: z.ZodMiniType<
  DeleteReviewSubjectResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Review$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function deleteReviewSubjectResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteReviewSubjectResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteReviewSubjectResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteReviewSubjectResponse' from JSON`,
  );
}
