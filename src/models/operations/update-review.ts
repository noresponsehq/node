import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type UpdateReviewRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  reviewId: string;
  body: models.ReviewUpdateRequest;
};

export type UpdateReviewResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Review;
};

/** @internal */
export type UpdateReviewRequest$Outbound = {
  workspace_id: string;
  environment: string;
  review_id: string;
  body: models.ReviewUpdateRequest$Outbound;
};

/** @internal */
export const UpdateReviewRequest$outboundSchema: z.ZodMiniType<
  UpdateReviewRequest$Outbound,
  UpdateReviewRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    reviewId: z.string(),
    body: models.ReviewUpdateRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      reviewId: "review_id",
    });
  }),
);

export function updateReviewRequestToJSON(
  updateReviewRequest: UpdateReviewRequest,
): string {
  return JSON.stringify(
    UpdateReviewRequest$outboundSchema.parse(updateReviewRequest),
  );
}

/** @internal */
export const UpdateReviewResponse$inboundSchema: z.ZodMiniType<
  UpdateReviewResponse,
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

export function updateReviewResponseFromJSON(
  jsonString: string,
): SafeParseResult<UpdateReviewResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UpdateReviewResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UpdateReviewResponse' from JSON`,
  );
}
