import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  SigningSecret,
  SigningSecret$inboundSchema,
} from "./signing-secret.js";

/**
 * The 201 answer of POST /v1/webhooks/{endpoint_id}/rotate: the new signing secret, shown once, which signs every delivery from now on, and when the key it replaced stops verifying. Until then a receiver accepts both.
 */
export type WebhookKeyRotation = {
  /**
   * Opaque id of the endpoint registration.
   */
  endpointId: string;
  /**
   * A newly issued signing key with its secret, shown only in this answer. A receiver verifies NR-Webhook-Signature with the secret's UTF-8 bytes as the HMAC-SHA256 key.
   */
  signingSecret: SigningSecret;
  /**
   * The key that signed until this rotation.
   */
  previousKeyId: string;
  /**
   * When the previous key stops verifying: 7 days after the rotation.
   */
  previousKeyExpiresAt: string;
};

/** @internal */
export const WebhookKeyRotation$inboundSchema: z.ZodMiniType<
  WebhookKeyRotation,
  unknown
> = z.pipe(
  z.object({
    endpoint_id: types.string(),
    signing_secret: SigningSecret$inboundSchema,
    previous_key_id: types.string(),
    previous_key_expires_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "endpoint_id": "endpointId",
      "signing_secret": "signingSecret",
      "previous_key_id": "previousKeyId",
      "previous_key_expires_at": "previousKeyExpiresAt",
    });
  }),
);

export function webhookKeyRotationFromJSON(
  jsonString: string,
): SafeParseResult<WebhookKeyRotation, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookKeyRotation$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookKeyRotation' from JSON`,
  );
}
