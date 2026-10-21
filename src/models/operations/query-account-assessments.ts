import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type QueryAccountAssessmentsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AssessmentList;
};

/** @internal */
export const QueryAccountAssessmentsResponse$inboundSchema: z.ZodMiniType<
  QueryAccountAssessmentsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AssessmentList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function queryAccountAssessmentsResponseFromJSON(
  jsonString: string,
): SafeParseResult<QueryAccountAssessmentsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => QueryAccountAssessmentsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'QueryAccountAssessmentsResponse' from JSON`,
  );
}
