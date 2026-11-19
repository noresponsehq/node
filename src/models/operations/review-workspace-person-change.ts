import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ReviewWorkspacePersonChangeRequest = {
  personId: string;
  changeId: string;
  body: models.ScreeningCancelRequest;
};

export type ReviewWorkspacePersonChangeResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PersonChange;
};

/** @internal */
export type ReviewWorkspacePersonChangeRequest$Outbound = {
  person_id: string;
  change_id: string;
  body: models.ScreeningCancelRequest$Outbound;
};

/** @internal */
export const ReviewWorkspacePersonChangeRequest$outboundSchema: z.ZodMiniType<
  ReviewWorkspacePersonChangeRequest$Outbound,
  ReviewWorkspacePersonChangeRequest
> = z.pipe(
  z.object({
    personId: z.string(),
    changeId: z.string(),
    body: models.ScreeningCancelRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      personId: "person_id",
      changeId: "change_id",
    });
  }),
);

export function reviewWorkspacePersonChangeRequestToJSON(
  reviewWorkspacePersonChangeRequest: ReviewWorkspacePersonChangeRequest,
): string {
  return JSON.stringify(
    ReviewWorkspacePersonChangeRequest$outboundSchema.parse(
      reviewWorkspacePersonChangeRequest,
    ),
  );
}

/** @internal */
export const ReviewWorkspacePersonChangeResponse$inboundSchema: z.ZodMiniType<
  ReviewWorkspacePersonChangeResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.PersonChange$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function reviewWorkspacePersonChangeResponseFromJSON(
  jsonString: string,
): SafeParseResult<ReviewWorkspacePersonChangeResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) =>
      ReviewWorkspacePersonChangeResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewWorkspacePersonChangeResponse' from JSON`,
  );
}
