import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { ClosedEnum } from "../types/enums.js";
import { Role, Role$outboundSchema } from "./role.js";

export const MemberUpdateRequestEnvironment = {
  Live: "live",
  Test: "test",
} as const;
export type MemberUpdateRequestEnvironment = ClosedEnum<
  typeof MemberUpdateRequestEnvironment
>;

export const MemberUpdateRequestDeniedAction = {
  EvidenceRead: "evidence.read",
  ExportsRead: "exports.read",
  PolicyPublish: "policy.publish",
} as const;
export type MemberUpdateRequestDeniedAction = ClosedEnum<
  typeof MemberUpdateRequestDeniedAction
>;

/**
 * PATCH /v1/workspaces/{workspace_id}/members/{member_id} body: the member's new role. The workspace's last owner cannot be demoted.
 */
export type MemberUpdateRequest = {
  /**
   * A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.
   */
  role: Role;
  /**
   * Allowed data environments. Invites default to both. Omitted on member PATCH preserves the current grants; owners retain both.
   */
  environments?: Array<MemberUpdateRequestEnvironment> | undefined;
  /**
   * Independent removals from a built-in preset: sensitive evidence, exports, or active policy publication. Owners retain full authority. Omitted member updates preserve exclusions.
   */
  deniedActions?: Array<MemberUpdateRequestDeniedAction> | undefined;
};

/** @internal */
export const MemberUpdateRequestEnvironment$outboundSchema: z.ZodMiniEnum<
  typeof MemberUpdateRequestEnvironment
> = z.enum(MemberUpdateRequestEnvironment);

/** @internal */
export const MemberUpdateRequestDeniedAction$outboundSchema: z.ZodMiniEnum<
  typeof MemberUpdateRequestDeniedAction
> = z.enum(MemberUpdateRequestDeniedAction);

/** @internal */
export type MemberUpdateRequest$Outbound = {
  role: string;
  environments?: Array<string> | undefined;
  denied_actions?: Array<string> | undefined;
};

/** @internal */
export const MemberUpdateRequest$outboundSchema: z.ZodMiniType<
  MemberUpdateRequest$Outbound,
  MemberUpdateRequest
> = z.pipe(
  z.object({
    role: Role$outboundSchema,
    environments: z.optional(
      z.array(MemberUpdateRequestEnvironment$outboundSchema),
    ),
    deniedActions: z.optional(
      z.array(MemberUpdateRequestDeniedAction$outboundSchema),
    ),
  }),
  z.transform((v) => {
    return remap$(v, {
      deniedActions: "denied_actions",
    });
  }),
);

export function memberUpdateRequestToJSON(
  memberUpdateRequest: MemberUpdateRequest,
): string {
  return JSON.stringify(
    MemberUpdateRequest$outboundSchema.parse(memberUpdateRequest),
  );
}
