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
import { KeyKind, KeyKind$inboundSchema } from "./key-kind.js";
import { KeyStatus, KeyStatus$inboundSchema } from "./key-status.js";

export const KeyScope = {
  Assess: "assess",
  History: "history",
  Delete: "delete",
  Webhooks: "webhooks",
  Detailed: "detailed",
  Integrations: "integrations",
  Management: "management",
  Audit: "audit",
  Usage: "usage",
  Investigate: "investigate",
  Evidence: "evidence",
  Exports: "exports",
  AuditManage: "audit_manage",
  Settings: "settings",
  PolicyPublish: "policy_publish",
  Members: "members",
  MembersManage: "members_manage",
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
   * The earlier of the explicit lifetime and any rotation overlap. Rotation preserves the original lifetime.
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
  /**
   * The optional display name supplied for this API key. Preserved on rotation.
   */
  name?: string | undefined;
  /**
   * Optional operational purpose, at most 200 printable characters without leading or trailing whitespace. Do not put secrets or personal data here. Preserved on rotation and included in the creation request fingerprint; omitted for older credentials.
   */
  purpose?: string | undefined;
  kind?: KeyKind | undefined;
  /**
   * The issuing member's external identity for a personal key. Personal ownership is fixed and the key is revoked when that member loses authority. Service keys belong to the workspace and omit this field.
   */
  ownerUserId?: string | undefined;
  /**
   * Replacement public key identifier, or legacy when the successor predates recorded lineage. This field excludes the secret.
   */
  rotatedTo?: string | undefined;
  /**
   * Latest recorded authenticated request observation, updated at most once per minute. Capture is best effort after the response and includes authenticated requests refused by authorization or rate limits. Absence means unknown and does not prove the key was unused. It is independent of diagnostic retention and resets on the replacement key after rotation. This field retains no raw IP or user-agent.
   */
  lastUsedAt?: string | undefined;
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
    name: types.optional(types.string()),
    purpose: types.optional(types.string()),
    kind: types.optional(KeyKind$inboundSchema),
    owner_user_id: types.optional(types.string()),
    rotated_to: types.optional(types.string()),
    last_used_at: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "workspace_id": "workspaceId",
      "created_at": "createdAt",
      "created_by": "createdBy",
      "expires_at": "expiresAt",
      "revoked_at": "revokedAt",
      "revoked_by": "revokedBy",
      "owner_user_id": "ownerUserId",
      "rotated_to": "rotatedTo",
      "last_used_at": "lastUsedAt",
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
