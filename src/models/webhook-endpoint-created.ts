import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  SigningSecret,
  SigningSecret$inboundSchema,
} from "./signing-secret.js";
import {
  WebhookEndpoint,
  WebhookEndpoint$inboundSchema,
} from "./webhook-endpoint.js";

/**
 * The 201 answer of POST /v1/webhooks: the new endpoint, unverified, and its first signing secret, shown once. Store the secret where the receiver reads it, then send endpoint.verification with POST /v1/webhooks/{endpoint_id}/test.
 */
export type WebhookEndpointCreated = {
  /**
   * One of the workspace's registered webhook endpoints. Signing secrets are not part of it: a secret is shown once, when it is issued (POST /v1/webhooks and POST /v1/webhooks/{endpoint_id}/rotate).
   */
  endpoint: WebhookEndpoint;
  /**
   * A newly issued signing key with its secret, shown only in this answer. A receiver verifies NR-Webhook-Signature with the secret's UTF-8 bytes as the HMAC-SHA256 key.
   */
  signingSecret: SigningSecret;
};

/** @internal */
export const WebhookEndpointCreated$inboundSchema: z.ZodMiniType<
  WebhookEndpointCreated,
  unknown
> = z.pipe(
  z.object({
    endpoint: WebhookEndpoint$inboundSchema,
    signing_secret: SigningSecret$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "signing_secret": "signingSecret",
    });
  }),
);

export function webhookEndpointCreatedFromJSON(
  jsonString: string,
): SafeParseResult<WebhookEndpointCreated, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookEndpointCreated$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookEndpointCreated' from JSON`,
  );
}
