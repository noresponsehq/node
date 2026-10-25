import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  KeyEnvironment,
  KeyEnvironment$inboundSchema,
} from "./key-environment.js";
import { KeyStatus, KeyStatus$inboundSchema } from "./key-status.js";

export const KeyScope = {
  Assess: "assess",
  History: "history",
  Delete: "delete",
  Webhooks: "webhooks",
  Detailed: "detailed",
  Integrations: "integrations",
  Management: "management",
} as const;
export type KeyScope = OpenEnum<typeof KeyScope>;

/**
 * One API key of your workspace. A key belongs to exactly one environment. key, the secret credential, is present only in the answer that created the key: NoResponse keeps a peppered digest of it, so store it now. Every other field is safe to show.
 */
export type Key = {
  /**
   * The key's public id, a 26-character ULID.
   */
  id: string;
  /**
   * The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.
   */
  workspaceId: string;
  /**
   * The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.
   */
  environment: KeyEnvironment;
  /**
   * The public start of the credential, nrk_<environment>_<key id>, which identifies the key in logs and secret stores without its secret.
   */
  prefix: string;
  /**
   * The key's scopes, each at most once.
   */
  scopes: Array<KeyScope>;
  /**
   * active: the key authenticates. expired: a rotation's overlap window has ended (expires_at). revoked: the key was revoked (revoked_at) and answers 401.
   */
  status: KeyStatus;
  createdAt: string;
  /**
   * The external user id of the member who created the key through the console, or the prefix (nrk_<environment>_<key id>) of the management key that created it. Absent for a key NoResponse issued or a rotation made.
   */
  createdBy?: string | undefined;
  /**
   * When a rotated key stops authenticating (POST /v1/keys/rotate). Absent for a key with no end.
   */
  expiresAt?: string | undefined;
  revokedAt?: string | undefined;
  /**
   * The external user id of the member who revoked the key through the console, or the prefix of the management key that revoked it. Absent when the key is not revoked or NoResponse revoked it.
   */
  revokedBy?: string | undefined;
  /**
   * The credential, nrk_<environment>_<key id>_<secret>. Present only in the 201 answer that created the key.
   */
  key?: string | undefined;
};

/** @internal */
export const KeyScope$inboundSchema: z.ZodMiniType<KeyScope, unknown> =
  openEnums.inboundSchema(KeyScope);

/** @internal */
export const Key$inboundSchema: z.ZodMiniType<Key, unknown> = z.pipe(
  z.object({
    id: types.string(),
    workspace_id: types.string(),
    environment: KeyEnvironment$inboundSchema,
    prefix: types.string(),
    scopes: z.array(KeyScope$inboundSchema),
    status: KeyStatus$inboundSchema,
    created_at: types.string(),
    created_by: types.optional(types.string()),
    expires_at: types.optional(types.string()),
    revoked_at: types.optional(types.string()),
    revoked_by: types.optional(types.string()),
    key: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "workspace_id": "workspaceId",
      "created_at": "createdAt",
      "created_by": "createdBy",
      "expires_at": "expiresAt",
      "revoked_at": "revokedAt",
      "revoked_by": "revokedBy",
    });
  }),
);

export function keyFromJSON(
  jsonString: string,
): SafeParseResult<Key, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Key$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Key' from JSON`,
  );
}
