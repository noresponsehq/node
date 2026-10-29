import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListReviewResolutionsRequest = {
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
  beforeVersion?: number | undefined;
};

export type ListReviewResolutionsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ReviewResolutionList;
};

/** @internal */
export type ListReviewResolutionsRequest$Outbound = {
  workspace_id: string;
  environment: string;
  review_id: string;
  limit: number;
  before_version?: number | undefined;
};

/** @internal */
export const ListReviewResolutionsRequest$outboundSchema: z.ZodMiniType<
  ListReviewResolutionsRequest$Outbound,
  ListReviewResolutionsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    reviewId: z.string(),
    limit: z._default(z.int(), 50),
    beforeVersion: z.optional(z.int()),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      reviewId: "review_id",
      beforeVersion: "before_version",
    });
  }),
);

export function listReviewResolutionsRequestToJSON(
  listReviewResolutionsRequest: ListReviewResolutionsRequest,
): string {
  return JSON.stringify(
    ListReviewResolutionsRequest$outboundSchema.parse(
      listReviewResolutionsRequest,
    ),
  );
}

/** @internal */
export const ListReviewResolutionsResponse$inboundSchema: z.ZodMiniType<
  ListReviewResolutionsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ReviewResolutionList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listReviewResolutionsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListReviewResolutionsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListReviewResolutionsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListReviewResolutionsResponse' from JSON`,
  );
}
