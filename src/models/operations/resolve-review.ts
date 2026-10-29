import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ResolveReviewRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  reviewId: string;
  body: models.ReviewResolveRequest;
};

export type ResolveReviewResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Review;
};

/** @internal */
export type ResolveReviewRequest$Outbound = {
  workspace_id: string;
  environment: string;
  review_id: string;
  body: models.ReviewResolveRequest$Outbound;
};

/** @internal */
export const ResolveReviewRequest$outboundSchema: z.ZodMiniType<
  ResolveReviewRequest$Outbound,
  ResolveReviewRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    reviewId: z.string(),
    body: models.ReviewResolveRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      reviewId: "review_id",
    });
  }),
);

export function resolveReviewRequestToJSON(
  resolveReviewRequest: ResolveReviewRequest,
): string {
  return JSON.stringify(
    ResolveReviewRequest$outboundSchema.parse(resolveReviewRequest),
  );
}

/** @internal */
export const ResolveReviewResponse$inboundSchema: z.ZodMiniType<
  ResolveReviewResponse,
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

export function resolveReviewResponseFromJSON(
  jsonString: string,
): SafeParseResult<ResolveReviewResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ResolveReviewResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ResolveReviewResponse' from JSON`,
  );
}
