import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetAssessmentVersionRequest = {
  /**
   * Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.
   */
  assessmentId: string;
  /**
   * Optional standard or separately authorised detailed customer view; raw is rejected.
   */
  responseMode?: models.ResponseMode | undefined;
  /**
   * The stored assessment_version, in canonical decimal form. An unavailable or malformed version answers 404.
   */
  version: number;
};

export type GetAssessmentVersionResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AssessmentRevision;
};

/** @internal */
export type GetAssessmentVersionRequest$Outbound = {
  assessment_id: string;
  response_mode?: string | undefined;
  version: number;
};

/** @internal */
export const GetAssessmentVersionRequest$outboundSchema: z.ZodMiniType<
  GetAssessmentVersionRequest$Outbound,
  GetAssessmentVersionRequest
> = z.pipe(
  z.object({
    assessmentId: z.string(),
    responseMode: z.optional(models.ResponseMode$outboundSchema),
    version: z.int(),
  }),
  z.transform((v) => {
    return remap$(v, {
      assessmentId: "assessment_id",
      responseMode: "response_mode",
    });
  }),
);

export function getAssessmentVersionRequestToJSON(
  getAssessmentVersionRequest: GetAssessmentVersionRequest,
): string {
  return JSON.stringify(
    GetAssessmentVersionRequest$outboundSchema.parse(
      getAssessmentVersionRequest,
    ),
  );
}

/** @internal */
export const GetAssessmentVersionResponse$inboundSchema: z.ZodMiniType<
  GetAssessmentVersionResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AssessmentRevision$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getAssessmentVersionResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetAssessmentVersionResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetAssessmentVersionResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetAssessmentVersionResponse' from JSON`,
  );
}
