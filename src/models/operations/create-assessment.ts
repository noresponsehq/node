import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateAssessmentRequest = {
  /**
   * Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the tenant principal and bound to the canonical body for 24 hours.
   */
  idempotencyKey: string;
  body: models.AssessmentRequest;
};

export type CreateAssessmentResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Assessment;
};

/** @internal */
export type CreateAssessmentRequest$Outbound = {
  "Idempotency-Key": string;
  body: models.AssessmentRequest$Outbound;
};

/** @internal */
export const CreateAssessmentRequest$outboundSchema: z.ZodMiniType<
  CreateAssessmentRequest$Outbound,
  CreateAssessmentRequest
> = z.pipe(
  z.object({
    idempotencyKey: z.string(),
    body: models.AssessmentRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function createAssessmentRequestToJSON(
  createAssessmentRequest: CreateAssessmentRequest,
): string {
  return JSON.stringify(
    CreateAssessmentRequest$outboundSchema.parse(createAssessmentRequest),
  );
}

/** @internal */
export const CreateAssessmentResponse$inboundSchema: z.ZodMiniType<
  CreateAssessmentResponse,
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

export function createAssessmentResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateAssessmentResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateAssessmentResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateAssessmentResponse' from JSON`,
  );
}
