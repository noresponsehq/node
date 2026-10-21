import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetAssessmentRequest = {
  /**
   * Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.
   */
  assessmentId: string;
  /**
   * Optional standard or separately authorised detailed customer view; raw is rejected.
   */
  responseMode?: models.ResponseMode | undefined;
};

export type GetAssessmentResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Assessment;
};

/** @internal */
export type GetAssessmentRequest$Outbound = {
  assessment_id: string;
  response_mode?: string | undefined;
};

/** @internal */
export const GetAssessmentRequest$outboundSchema: z.ZodMiniType<
  GetAssessmentRequest$Outbound,
  GetAssessmentRequest
> = z.pipe(
  z.object({
    assessmentId: z.string(),
    responseMode: z.optional(models.ResponseMode$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      assessmentId: "assessment_id",
      responseMode: "response_mode",
    });
  }),
);

export function getAssessmentRequestToJSON(
  getAssessmentRequest: GetAssessmentRequest,
): string {
  return JSON.stringify(
    GetAssessmentRequest$outboundSchema.parse(getAssessmentRequest),
  );
}

/** @internal */
export const GetAssessmentResponse$inboundSchema: z.ZodMiniType<
  GetAssessmentResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Assessment$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getAssessmentResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetAssessmentResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetAssessmentResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetAssessmentResponse' from JSON`,
  );
}
