import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type SearchAccountsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AccountDirectoryPage;
};

/** @internal */
export const SearchAccountsResponse$inboundSchema: z.ZodMiniType<
  SearchAccountsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AccountDirectoryPage$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function searchAccountsResponseFromJSON(
  jsonString: string,
): SafeParseResult<SearchAccountsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SearchAccountsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SearchAccountsResponse' from JSON`,
  );
}
