import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type DeleteReviewViewRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  viewId: string;
  body: models.ReviewViewDeleteRequest;
};

export type DeleteReviewViewResponse = {
  headers: { [k: string]: Array<string> };
};

/** @internal */
export type DeleteReviewViewRequest$Outbound = {
  workspace_id: string;
  environment: string;
  view_id: string;
  body: models.ReviewViewDeleteRequest$Outbound;
};

/** @internal */
export const DeleteReviewViewRequest$outboundSchema: z.ZodMiniType<
  DeleteReviewViewRequest$Outbound,
  DeleteReviewViewRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    viewId: z.string(),
    body: models.ReviewViewDeleteRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      viewId: "view_id",
    });
  }),
);

export function deleteReviewViewRequestToJSON(
  deleteReviewViewRequest: DeleteReviewViewRequest,
): string {
  return JSON.stringify(
    DeleteReviewViewRequest$outboundSchema.parse(deleteReviewViewRequest),
  );
}

/** @internal */
export const DeleteReviewViewResponse$inboundSchema: z.ZodMiniType<
  DeleteReviewViewResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
    });
  }),
);

export function deleteReviewViewResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteReviewViewResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteReviewViewResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteReviewViewResponse' from JSON`,
  );
}
