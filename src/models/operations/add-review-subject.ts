import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type AddReviewSubjectRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  reviewId: string;
  body: models.ReviewSubjectRequest;
};

export type AddReviewSubjectResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ReviewSubjectChange;
};

/** @internal */
export type AddReviewSubjectRequest$Outbound = {
  workspace_id: string;
  environment: string;
  review_id: string;
  body: models.ReviewSubjectRequest$Outbound;
};

/** @internal */
export const AddReviewSubjectRequest$outboundSchema: z.ZodMiniType<
  AddReviewSubjectRequest$Outbound,
  AddReviewSubjectRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    reviewId: z.string(),
    body: models.ReviewSubjectRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      reviewId: "review_id",
    });
  }),
);

export function addReviewSubjectRequestToJSON(
  addReviewSubjectRequest: AddReviewSubjectRequest,
): string {
  return JSON.stringify(
    AddReviewSubjectRequest$outboundSchema.parse(addReviewSubjectRequest),
  );
}

/** @internal */
export const AddReviewSubjectResponse$inboundSchema: z.ZodMiniType<
  AddReviewSubjectResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ReviewSubjectChange$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function addReviewSubjectResponseFromJSON(
  jsonString: string,
): SafeParseResult<AddReviewSubjectResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AddReviewSubjectResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AddReviewSubjectResponse' from JSON`,
  );
}
