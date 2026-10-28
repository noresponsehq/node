import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type SearchAssessmentsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AssessmentSearchPage;
};

/** @internal */
export const SearchAssessmentsResponse$inboundSchema: z.ZodMiniType<
  SearchAssessmentsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AssessmentSearchPage$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function searchAssessmentsResponseFromJSON(
  jsonString: string,
): SafeParseResult<SearchAssessmentsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SearchAssessmentsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SearchAssessmentsResponse' from JSON`,
  );
}
