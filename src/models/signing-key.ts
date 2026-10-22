import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * One signing key, by id. The secret is not included.
 */
export type SigningKey = {
  /**
   * The signing key id, sent as NR-Webhook-Key-Id on every delivery it signs.
   */
  keyId: string;
  createdAt: string;
  /**
   * Present on a key a rotation replaced: it stops verifying at this instant, 7 days after the rotation. Absent on the key that signs.
   */
  expiresAt?: string | undefined;
};

/** @internal */
export const SigningKey$inboundSchema: z.ZodMiniType<SigningKey, unknown> = z
  .pipe(
    z.object({
      key_id: types.string(),
      created_at: types.string(),
      expires_at: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "key_id": "keyId",
        "created_at": "createdAt",
        "expires_at": "expiresAt",
      });
    }),
  );

export function signingKeyFromJSON(
  jsonString: string,
): SafeParseResult<SigningKey, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SigningKey$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SigningKey' from JSON`,
  );
}
