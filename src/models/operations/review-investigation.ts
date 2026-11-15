import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ReviewInvestigationRequest = {
  investigationId: string;
  body: models.PersonReviewRequest;
};

export type ReviewInvestigationResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Investigation;
};

/** @internal */
export type ReviewInvestigationRequest$Outbound = {
  investigation_id: string;
  body: models.PersonReviewRequest$Outbound;
};

/** @internal */
export const ReviewInvestigationRequest$outboundSchema: z.ZodMiniType<
  ReviewInvestigationRequest$Outbound,
  ReviewInvestigationRequest
> = z.pipe(
  z.object({
    investigationId: z.string(),
    body: models.PersonReviewRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      investigationId: "investigation_id",
    });
  }),
);

export function reviewInvestigationRequestToJSON(
  reviewInvestigationRequest: ReviewInvestigationRequest,
): string {
  return JSON.stringify(
    ReviewInvestigationRequest$outboundSchema.parse(reviewInvestigationRequest),
  );
}

/** @internal */
export const ReviewInvestigationResponse$inboundSchema: z.ZodMiniType<
  ReviewInvestigationResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Investigation$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function reviewInvestigationResponseFromJSON(
  jsonString: string,
): SafeParseResult<ReviewInvestigationResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewInvestigationResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewInvestigationResponse' from JSON`,
  );
}
