import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListIntegrationsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.IntegrationList;
};

/** @internal */
export const ListIntegrationsResponse$inboundSchema: z.ZodMiniType<
  ListIntegrationsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.IntegrationList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listIntegrationsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListIntegrationsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListIntegrationsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListIntegrationsResponse' from JSON`,
  );
}
