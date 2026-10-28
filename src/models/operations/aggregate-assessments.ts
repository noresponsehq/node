import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type AggregateAssessmentsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AssessmentAggregate;
};

/** @internal */
export const AggregateAssessmentsResponse$inboundSchema: z.ZodMiniType<
  AggregateAssessmentsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AssessmentAggregate$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function aggregateAssessmentsResponseFromJSON(
  jsonString: string,
): SafeParseResult<AggregateAssessmentsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AggregateAssessmentsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AggregateAssessmentsResponse' from JSON`,
  );
}
