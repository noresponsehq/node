import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export const Scope = {
  Assess: "assess",
  History: "history",
  Delete: "delete",
  Webhooks: "webhooks",
  Detailed: "detailed",
  Integrations: "integrations",
} as const;
export type Scope = OpenEnum<typeof Scope>;

/**
 * The 201 answer of POST /v1/keys/rotate: the new key, shown once, and when the key that was presented stops working. The new key has the scopes and the environment of the presented key.
 */
export type KeyRotation = {
  /**
   * The new credential, nrk_<mode>_<key id>_<secret>, in the environment of the presented key: nrk_live_ or nrk_test_. It is shown only in this answer; store it now.
   */
  key: string;
  /**
   * The public id of the new key.
   */
  keyId: string;
  /**
   * The scopes of the new key: those of the presented key.
   */
  scopes: Array<Scope>;
  createdAt: string;
  /**
   * The id of the key that signed this request.
   */
  previousKeyId: string;
  /**
   * When the previous key stops authenticating. Until then both keys work.
   */
  previousKeyExpiresAt: string;
};

/** @internal */
export const Scope$inboundSchema: z.ZodMiniType<Scope, unknown> = openEnums
  .inboundSchema(Scope);

/** @internal */
export const KeyRotation$inboundSchema: z.ZodMiniType<KeyRotation, unknown> = z
  .pipe(
    z.object({
      key: types.string(),
      key_id: types.string(),
      scopes: z.array(Scope$inboundSchema),
      created_at: types.string(),
      previous_key_id: types.string(),
      previous_key_expires_at: types.string(),
    }),
    z.transform((v) => {
      return remap$(v, {
        "key_id": "keyId",
        "created_at": "createdAt",
        "previous_key_id": "previousKeyId",
        "previous_key_expires_at": "previousKeyExpiresAt",
      });
    }),
  );

export function keyRotationFromJSON(
  jsonString: string,
): SafeParseResult<KeyRotation, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => KeyRotation$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'KeyRotation' from JSON`,
  );
}
