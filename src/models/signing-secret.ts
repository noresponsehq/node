import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * A newly issued signing key with its secret, shown only in this answer. A receiver verifies NR-Webhook-Signature with the secret's UTF-8 bytes as the HMAC-SHA256 key.
 */
export type SigningSecret = {
  /**
   * The signing key id, sent as NR-Webhook-Key-Id on every delivery it signs.
   */
  keyId: string;
  /**
   * The signing secret: 32 random bytes as 43 characters of unpadded base64url. It is not stored in readable form or returned again.
   */
  secret: string;
  createdAt: string;
};

/** @internal */
export const SigningSecret$inboundSchema: z.ZodMiniType<
  SigningSecret,
  unknown
> = z.pipe(
  z.object({
    key_id: types.string(),
    secret: types.string(),
    created_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "key_id": "keyId",
      "created_at": "createdAt",
    });
  }),
);

export function signingSecretFromJSON(
  jsonString: string,
): SafeParseResult<SigningSecret, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SigningSecret$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SigningSecret' from JSON`,
  );
}
