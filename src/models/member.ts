import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { MemberStatus, MemberStatus$inboundSchema } from "./member-status.js";
import { Role, Role$inboundSchema } from "./role.js";

export const MemberEnvironment = {
  Live: "live",
  Test: "test",
} as const;
export type MemberEnvironment = OpenEnum<typeof MemberEnvironment>;

export const MemberDeniedAction = {
  EvidenceRead: "evidence.read",
  ExportsRead: "exports.read",
  PolicyPublish: "policy.publish",
} as const;
export type MemberDeniedAction = OpenEnum<typeof MemberDeniedAction>;

/**
 * One member of a workspace: an external user id holding one role. A removed member loses every permission at once.
 */
export type Member = {
  /**
   * Opaque, server-assigned member id: mem_ and a 26-character ULID. It stays the same when a removed member is invited back.
   */
  id: string;
  /**
   * The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.
   */
  workspaceId: string;
  /**
   * The user's id at the identity provider the console signs people in with: 1 to 256 printable ASCII characters with no space, compared exactly.
   */
  externalUserId: string;
  /**
   * A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.
   */
  role: Role;
  /**
   * Listed and returned members are active.
   */
  status: MemberStatus;
  createdAt: string;
  updatedAt: string;
  /**
   * Allowed data environments. Invites default to both. Omitted on member PATCH preserves the current grants; owners retain both.
   */
  environments?: Array<MemberEnvironment> | undefined;
  /**
   * Independent removals from a built-in preset: sensitive evidence, exports, or active policy publication. Owners retain full authority. Omitted member updates preserve exclusions.
   */
  deniedActions?: Array<MemberDeniedAction> | undefined;
  /**
   * Immutable internal workspace principal, equal to member id, preserved across explicit provider-identity migrations.
   */
  principalId?: string | undefined;
  /**
   * Informational display name. Authentication and provider identity use the verified subject binding.
   */
  displayName?: string | undefined;
  /**
   * Unverified contact address for display. Empty clears it; a supplied value must be an address. Identity linking uses the verified provider subject.
   */
  unverifiedEmail?: string | undefined;
};

/** @internal */
export const MemberEnvironment$inboundSchema: z.ZodMiniType<
  MemberEnvironment,
  unknown
> = openEnums.inboundSchema(MemberEnvironment);

/** @internal */
export const MemberDeniedAction$inboundSchema: z.ZodMiniType<
  MemberDeniedAction,
  unknown
> = openEnums.inboundSchema(MemberDeniedAction);

/** @internal */
export const Member$inboundSchema: z.ZodMiniType<Member, unknown> = z.pipe(
  z.object({
    id: types.string(),
    workspace_id: types.string(),
    external_user_id: types.string(),
    role: Role$inboundSchema,
    status: MemberStatus$inboundSchema,
    created_at: types.string(),
    updated_at: types.string(),
    environments: types.optional(z.array(MemberEnvironment$inboundSchema)),
    denied_actions: types.optional(z.array(MemberDeniedAction$inboundSchema)),
    principal_id: types.optional(types.string()),
    display_name: types.optional(types.string()),
    unverified_email: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "workspace_id": "workspaceId",
      "external_user_id": "externalUserId",
      "created_at": "createdAt",
      "updated_at": "updatedAt",
      "denied_actions": "deniedActions",
      "principal_id": "principalId",
      "display_name": "displayName",
      "unverified_email": "unverifiedEmail",
    });
  }),
);

export function memberFromJSON(
  jsonString: string,
): SafeParseResult<Member, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Member$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Member' from JSON`,
  );
}
