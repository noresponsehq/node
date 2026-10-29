import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListReviewSubjectsRequest = {
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

export type ListReviewSubjectsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ReviewSubjectList;
};

/** @internal */
export type ListReviewSubjectsRequest$Outbound = {
  workspace_id: string;
  environment: string;
  review_id: string;
};

/** @internal */
export const ListReviewSubjectsRequest$outboundSchema: z.ZodMiniType<
  ListReviewSubjectsRequest$Outbound,
  ListReviewSubjectsRequest
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

export function listReviewSubjectsRequestToJSON(
  listReviewSubjectsRequest: ListReviewSubjectsRequest,
): string {
  return JSON.stringify(
    ListReviewSubjectsRequest$outboundSchema.parse(listReviewSubjectsRequest),
  );
}

/** @internal */
export const ListReviewSubjectsResponse$inboundSchema: z.ZodMiniType<
  ListReviewSubjectsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ReviewSubjectList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listReviewSubjectsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListReviewSubjectsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListReviewSubjectsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListReviewSubjectsResponse' from JSON`,
  );
}
