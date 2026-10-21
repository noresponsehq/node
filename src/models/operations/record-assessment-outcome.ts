import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RecordAssessmentOutcomeRequest = {
  /**
   * Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.
   */
  assessmentId: string;
  /**
   * Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the tenant principal and bound to the canonical body for 24 hours.
   */
  idempotencyKey: string;
  body: models.AssessmentOutcomeRequest;
};

export type RecordAssessmentOutcomeResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AssessmentOutcome;
};

/** @internal */
export type RecordAssessmentOutcomeRequest$Outbound = {
  assessment_id: string;
  "Idempotency-Key": string;
  body: models.AssessmentOutcomeRequest$Outbound;
};

/** @internal */
export const RecordAssessmentOutcomeRequest$outboundSchema: z.ZodMiniType<
  RecordAssessmentOutcomeRequest$Outbound,
  RecordAssessmentOutcomeRequest
> = z.pipe(
  z.object({
    assessmentId: z.string(),
    idempotencyKey: z.string(),
    body: models.AssessmentOutcomeRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      assessmentId: "assessment_id",
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function recordAssessmentOutcomeRequestToJSON(
  recordAssessmentOutcomeRequest: RecordAssessmentOutcomeRequest,
): string {
  return JSON.stringify(
    RecordAssessmentOutcomeRequest$outboundSchema.parse(
      recordAssessmentOutcomeRequest,
    ),
  );
}

/** @internal */
export const RecordAssessmentOutcomeResponse$inboundSchema: z.ZodMiniType<
  RecordAssessmentOutcomeResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AssessmentOutcome$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function recordAssessmentOutcomeResponseFromJSON(
  jsonString: string,
): SafeParseResult<RecordAssessmentOutcomeResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordAssessmentOutcomeResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordAssessmentOutcomeResponse' from JSON`,
  );
}
