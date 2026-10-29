import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Role, Role$inboundSchema } from "./role.js";

export const InviteEnvironment = {
  Live: "live",
  Test: "test",
} as const;
export type InviteEnvironment = OpenEnum<typeof InviteEnvironment>;

export const InviteDeniedAction = {
  EvidenceRead: "evidence.read",
  ExportsRead: "exports.read",
  PolicyPublish: "policy.publish",
} as const;
export type InviteDeniedAction = OpenEnum<typeof InviteDeniedAction>;

/**
 * A pending workspace invitation. Creating or reissuing it returns a token once; lists omit it. The token can be accepted once before expiry and is invalidated on revocation or reissue. Token state does not establish email delivery.
 */
export type Invite = {
  /**
   * Opaque, server-assigned invite id: inv_ and a 26-character ULID.
   */
  id: string;
  /**
   * The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.
   */
  workspaceId: string;
  /**
   * A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.
   */
  role: Role;
  /**
   * Where the console sends the invite. Informational: it is not matched against the accepting user.
   */
  email?: string | undefined;
  /**
   * The user's id at the identity provider the console signs people in with: 1 to 256 printable ASCII characters with no space, compared exactly.
   */
  externalUserId?: string | undefined;
  /**
   * The stable member id that issued this invite, or the authenticated live API key prefix for members_manage automation. Reissuing preserves the original creator; the audit event names the reissuing actor.
   */
  createdBy: string;
  createdAt: string;
  expiresAt: string;
  /**
   * The invite token: nrinv_, the invite id's ULID, _ and 43 unpadded base64url characters (32 random bytes). The new member's console sends it to POST /v1/invites/accept.
   */
  token?: string | undefined;
  /**
   * Allowed data environments. Invites default to both. Omitted on member PATCH preserves the current grants; owners retain both.
   */
  environments?: Array<InviteEnvironment> | undefined;
  /**
   * Independent removals from a built-in preset: sensitive evidence, exports, or active policy publication. Owners retain full authority. Omitted member updates preserve exclusions.
   */
  deniedActions?: Array<InviteDeniedAction> | undefined;
  /**
   * Last token reissue, not proof of email delivery.
   */
  reissuedAt?: string | undefined;
};

/** @internal */
export const InviteEnvironment$inboundSchema: z.ZodMiniType<
  InviteEnvironment,
  unknown
> = openEnums.inboundSchema(InviteEnvironment);

/** @internal */
export const InviteDeniedAction$inboundSchema: z.ZodMiniType<
  InviteDeniedAction,
  unknown
> = openEnums.inboundSchema(InviteDeniedAction);

/** @internal */
export const Invite$inboundSchema: z.ZodMiniType<Invite, unknown> = z.pipe(
  z.object({
    id: types.string(),
    workspace_id: types.string(),
    role: Role$inboundSchema,
    email: types.optional(types.string()),
    external_user_id: types.optional(types.string()),
    created_by: types.string(),
    created_at: types.string(),
    expires_at: types.string(),
    token: types.optional(types.string()),
    environments: types.optional(z.array(InviteEnvironment$inboundSchema)),
    denied_actions: types.optional(z.array(InviteDeniedAction$inboundSchema)),
    reissued_at: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "workspace_id": "workspaceId",
      "external_user_id": "externalUserId",
      "created_by": "createdBy",
      "created_at": "createdAt",
      "expires_at": "expiresAt",
      "denied_actions": "deniedActions",
      "reissued_at": "reissuedAt",
    });
  }),
);

export function inviteFromJSON(
  jsonString: string,
): SafeParseResult<Invite, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Invite$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Invite' from JSON`,
  );
}
