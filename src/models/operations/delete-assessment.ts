import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type DeleteAssessmentRequest = {
  /**
   * Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.
   */
  assessmentId: string;
};

export type DeleteAssessmentResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AssessmentDeletion;
};

/** @internal */
export type DeleteAssessmentRequest$Outbound = {
  assessment_id: string;
};

/** @internal */
export const DeleteAssessmentRequest$outboundSchema: z.ZodMiniType<
  DeleteAssessmentRequest$Outbound,
  DeleteAssessmentRequest
> = z.pipe(
  z.object({
    assessmentId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      assessmentId: "assessment_id",
    });
  }),
);

export function deleteAssessmentRequestToJSON(
  deleteAssessmentRequest: DeleteAssessmentRequest,
): string {
  return JSON.stringify(
    DeleteAssessmentRequest$outboundSchema.parse(deleteAssessmentRequest),
  );
}

/** @internal */
export const DeleteAssessmentResponse$inboundSchema: z.ZodMiniType<
  DeleteAssessmentResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AssessmentDeletion$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function deleteAssessmentResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteAssessmentResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteAssessmentResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteAssessmentResponse' from JSON`,
  );
}
