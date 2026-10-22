import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  WebhookEndpoint,
  WebhookEndpoint$inboundSchema,
} from "./webhook-endpoint.js";

/**
 * GET /v1/webhooks answer: every endpoint of the calling tenant, in every state, ordered by endpoint_id. A tenant holds at most 5, so there is no page.
 */
export type WebhookEndpointList = {
  items: Array<WebhookEndpoint>;
};

/** @internal */
export const WebhookEndpointList$inboundSchema: z.ZodMiniType<
  WebhookEndpointList,
  unknown
> = z.object({
  items: z.array(WebhookEndpoint$inboundSchema),
});

export function webhookEndpointListFromJSON(
  jsonString: string,
): SafeParseResult<WebhookEndpointList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookEndpointList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookEndpointList' from JSON`,
  );
}
