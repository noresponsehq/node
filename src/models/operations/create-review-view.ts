import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateReviewViewRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  body: models.ReviewViewRequest;
};

export type CreateReviewViewResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ReviewView;
};

/** @internal */
export type CreateReviewViewRequest$Outbound = {
  workspace_id: string;
  environment: string;
  body: models.ReviewViewRequest$Outbound;
};

/** @internal */
export const CreateReviewViewRequest$outboundSchema: z.ZodMiniType<
  CreateReviewViewRequest$Outbound,
  CreateReviewViewRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    body: models.ReviewViewRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function createReviewViewRequestToJSON(
  createReviewViewRequest: CreateReviewViewRequest,
): string {
  return JSON.stringify(
    CreateReviewViewRequest$outboundSchema.parse(createReviewViewRequest),
  );
}

/** @internal */
export const CreateReviewViewResponse$inboundSchema: z.ZodMiniType<
  CreateReviewViewResponse,
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

export function createReviewViewResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateReviewViewResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateReviewViewResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateReviewViewResponse' from JSON`,
  );
}
