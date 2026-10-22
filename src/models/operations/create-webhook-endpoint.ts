import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateWebhookEndpointResponse = {
  headers: { [k: string]: Array<string> };
  result: models.WebhookEndpointCreated;
};

/** @internal */
export const CreateWebhookEndpointResponse$inboundSchema: z.ZodMiniType<
  CreateWebhookEndpointResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.WebhookEndpointCreated$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function createWebhookEndpointResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateWebhookEndpointResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateWebhookEndpointResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateWebhookEndpointResponse' from JSON`,
  );
}
