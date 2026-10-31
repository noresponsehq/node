import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type QueryReviewsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  body: models.ReviewQueryRequest;
};

export type QueryReviewsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ReviewList;
};

/** @internal */
export type QueryReviewsRequest$Outbound = {
  workspace_id: string;
  environment: string;
  body: models.ReviewQueryRequest$Outbound;
};

/** @internal */
export const QueryReviewsRequest$outboundSchema: z.ZodMiniType<
  QueryReviewsRequest$Outbound,
  QueryReviewsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    body: models.ReviewQueryRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function queryReviewsRequestToJSON(
  queryReviewsRequest: QueryReviewsRequest,
): string {
  return JSON.stringify(
    QueryReviewsRequest$outboundSchema.parse(queryReviewsRequest),
  );
}

/** @internal */
export const QueryReviewsResponse$inboundSchema: z.ZodMiniType<
  QueryReviewsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ReviewList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function queryReviewsResponseFromJSON(
  jsonString: string,
): SafeParseResult<QueryReviewsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => QueryReviewsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'QueryReviewsResponse' from JSON`,
  );
}
