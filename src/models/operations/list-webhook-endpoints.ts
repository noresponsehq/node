import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListWebhookEndpointsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.WebhookEndpointList;
};

/** @internal */
export const ListWebhookEndpointsResponse$inboundSchema: z.ZodMiniType<
  ListWebhookEndpointsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.WebhookEndpointList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listWebhookEndpointsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListWebhookEndpointsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListWebhookEndpointsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListWebhookEndpointsResponse' from JSON`,
  );
}
