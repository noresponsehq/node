import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ReviewPersonRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  groupId: string;
  personId: string;
  body: models.PersonReviewRequest;
};

export type ReviewPersonResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Person;
};

/** @internal */
export type ReviewPersonRequest$Outbound = {
  workspace_id: string;
  environment: string;
  group_id: string;
  person_id: string;
  body: models.PersonReviewRequest$Outbound;
};

/** @internal */
export const ReviewPersonRequest$outboundSchema: z.ZodMiniType<
  ReviewPersonRequest$Outbound,
  ReviewPersonRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    groupId: z.string(),
    personId: z.string(),
    body: models.PersonReviewRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      groupId: "group_id",
      personId: "person_id",
    });
  }),
);

export function reviewPersonRequestToJSON(
  reviewPersonRequest: ReviewPersonRequest,
): string {
  return JSON.stringify(
    ReviewPersonRequest$outboundSchema.parse(reviewPersonRequest),
  );
}

/** @internal */
export const ReviewPersonResponse$inboundSchema: z.ZodMiniType<
  ReviewPersonResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Person$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function reviewPersonResponseFromJSON(
  jsonString: string,
): SafeParseResult<ReviewPersonResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewPersonResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewPersonResponse' from JSON`,
  );
}
