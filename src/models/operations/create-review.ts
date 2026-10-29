import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateReviewRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  body: models.ReviewCreateRequest;
};

export type CreateReviewResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Review;
};

/** @internal */
export type CreateReviewRequest$Outbound = {
  workspace_id: string;
  environment: string;
  body: models.ReviewCreateRequest$Outbound;
};

/** @internal */
export const CreateReviewRequest$outboundSchema: z.ZodMiniType<
  CreateReviewRequest$Outbound,
  CreateReviewRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    body: models.ReviewCreateRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function createReviewRequestToJSON(
  createReviewRequest: CreateReviewRequest,
): string {
  return JSON.stringify(
    CreateReviewRequest$outboundSchema.parse(createReviewRequest),
  );
}

/** @internal */
export const CreateReviewResponse$inboundSchema: z.ZodMiniType<
  CreateReviewResponse,
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

export function createReviewResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateReviewResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateReviewResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateReviewResponse' from JSON`,
  );
}
