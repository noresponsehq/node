import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetReviewRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  reviewId: string;
};

export type GetReviewResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Review;
};

/** @internal */
export type GetReviewRequest$Outbound = {
  workspace_id: string;
  environment: string;
  review_id: string;
};

/** @internal */
export const GetReviewRequest$outboundSchema: z.ZodMiniType<
  GetReviewRequest$Outbound,
  GetReviewRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    reviewId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      reviewId: "review_id",
    });
  }),
);

export function getReviewRequestToJSON(
  getReviewRequest: GetReviewRequest,
): string {
  return JSON.stringify(
    GetReviewRequest$outboundSchema.parse(getReviewRequest),
  );
}

/** @internal */
export const GetReviewResponse$inboundSchema: z.ZodMiniType<
  GetReviewResponse,
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

export function getReviewResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetReviewResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetReviewResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetReviewResponse' from JSON`,
  );
}
