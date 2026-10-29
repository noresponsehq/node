import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListReviewViewsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
};

export type ListReviewViewsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ReviewViewList;
};

/** @internal */
export type ListReviewViewsRequest$Outbound = {
  workspace_id: string;
  environment: string;
};

/** @internal */
export const ListReviewViewsRequest$outboundSchema: z.ZodMiniType<
  ListReviewViewsRequest$Outbound,
  ListReviewViewsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function listReviewViewsRequestToJSON(
  listReviewViewsRequest: ListReviewViewsRequest,
): string {
  return JSON.stringify(
    ListReviewViewsRequest$outboundSchema.parse(listReviewViewsRequest),
  );
}

/** @internal */
export const ListReviewViewsResponse$inboundSchema: z.ZodMiniType<
  ListReviewViewsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ReviewViewList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listReviewViewsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListReviewViewsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListReviewViewsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListReviewViewsResponse' from JSON`,
  );
}
