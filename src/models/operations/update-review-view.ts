import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type UpdateReviewViewRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  viewId: string;
  body: models.ReviewViewRequest;
};

export type UpdateReviewViewResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ReviewView;
};

/** @internal */
export type UpdateReviewViewRequest$Outbound = {
  workspace_id: string;
  environment: string;
  view_id: string;
  body: models.ReviewViewRequest$Outbound;
};

/** @internal */
export const UpdateReviewViewRequest$outboundSchema: z.ZodMiniType<
  UpdateReviewViewRequest$Outbound,
  UpdateReviewViewRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    viewId: z.string(),
    body: models.ReviewViewRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      viewId: "view_id",
    });
  }),
);

export function updateReviewViewRequestToJSON(
  updateReviewViewRequest: UpdateReviewViewRequest,
): string {
  return JSON.stringify(
    UpdateReviewViewRequest$outboundSchema.parse(updateReviewViewRequest),
  );
}

/** @internal */
export const UpdateReviewViewResponse$inboundSchema: z.ZodMiniType<
  UpdateReviewViewResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ReviewView$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function updateReviewViewResponseFromJSON(
  jsonString: string,
): SafeParseResult<UpdateReviewViewResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UpdateReviewViewResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UpdateReviewViewResponse' from JSON`,
  );
}
