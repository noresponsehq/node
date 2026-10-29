import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { ClosedEnum } from "../types/enums.js";
import {
  KeyEnvironment,
  KeyEnvironment$outboundSchema,
} from "./key-environment.js";
import { KeyKind, KeyKind$outboundSchema } from "./key-kind.js";

export const KeyRequestScope = {
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
export type KeyRequestScope = ClosedEnum<typeof KeyRequestScope>;

/**
 * Creates a key whose scopes are bounded by the issuer capabilities in this environment. Delete is owner-only. A service key outlives its creator; a personal key belongs to the authenticated member and is revoked on membership or authority changes. request_id deduplicates creation: retry returns 200 metadata without the secret; changed parameters answer 409. Team scopes members and members_manage are explicitly workspace-wide, live-only, and delegated by a current full owner. Personal credentials cannot hold management or members_manage. Legacy management includes policy publication; use settings without policy_publish for configuration preparation and retention-only edits.
 */
export type KeyRequest = {
  /**
   * The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.
   */
  environment: KeyEnvironment;
  /**
   * The key's scopes, each at most once.
   */
  scopes: Array<KeyRequestScope>;
  /**
   * Optional display name for this API key, at most 100 printable characters. Preserved on rotation.
   */
  name?: string | undefined;
  /**
   * Optional operational purpose, at most 200 printable characters without leading or trailing whitespace. Do not put secrets or personal data here. Preserved on rotation and included in the creation request fingerprint; omitted for older credentials.
   */
  purpose?: string | undefined;
  kind?: KeyKind | undefined;
  /**
   * Between one minute and 365 days from now.
   */
  expiresAt?: string | undefined;
  /**
   * Caller-chosen identifier for one creation attempt, scoped to the issuing actor and environment. Use 1 to 256 printable ASCII characters without spaces. A retry with the same parameters returns the original key metadata with status 200 and no secret; changed parameters return 409.
   */
  requestId?: string | undefined;
};

/** @internal */
export const KeyRequestScope$outboundSchema: z.ZodMiniEnum<
  typeof KeyRequestScope
> = z.enum(KeyRequestScope);

/** @internal */
export type KeyRequest$Outbound = {
  environment: string;
  scopes: Array<string>;
  name?: string | undefined;
  purpose?: string | undefined;
  kind?: string | undefined;
  expires_at?: string | undefined;
  request_id?: string | undefined;
};

/** @internal */
export const KeyRequest$outboundSchema: z.ZodMiniType<
  KeyRequest$Outbound,
  KeyRequest
> = z.pipe(
  z.object({
    environment: KeyEnvironment$outboundSchema,
    scopes: z.array(KeyRequestScope$outboundSchema),
    name: z.optional(z.string()),
    purpose: z.optional(z.string()),
    kind: z.optional(KeyKind$outboundSchema),
    expiresAt: z.optional(z.string()),
    requestId: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      expiresAt: "expires_at",
      requestId: "request_id",
    });
  }),
);

export function keyRequestToJSON(keyRequest: KeyRequest): string {
  return JSON.stringify(KeyRequest$outboundSchema.parse(keyRequest));
}
