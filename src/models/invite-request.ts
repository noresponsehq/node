import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { ClosedEnum } from "../types/enums.js";
import { Role, Role$outboundSchema } from "./role.js";

export const InviteRequestEnvironment = {
  Live: "live",
  Test: "test",
} as const;
export type InviteRequestEnvironment = ClosedEnum<
  typeof InviteRequestEnvironment
>;

export const InviteRequestDeniedAction = {
  EvidenceRead: "evidence.read",
  ExportsRead: "exports.read",
  PolicyPublish: "policy.publish",
} as const;
export type InviteRequestDeniedAction = ClosedEnum<
  typeof InviteRequestDeniedAction
>;

/**
 * POST /v1/workspaces/{workspace_id}/invites body. Creates an invite for role and returns its token once. email is where the console sends the token and is not checked against the user who accepts. With external_user_id set, only that user can accept.
 */
export type InviteRequest = {
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
   * Allowed data environments. Invites default to both. Omitted on member PATCH preserves the current grants; owners retain both.
   */
  environments?: Array<InviteRequestEnvironment> | undefined;
  /**
   * Independent removals from a built-in preset: sensitive evidence, exports, or active policy publication. Owners retain full authority. Omitted member updates preserve exclusions.
   */
  deniedActions?: Array<InviteRequestDeniedAction> | undefined;
};

/** @internal */
export const InviteRequestEnvironment$outboundSchema: z.ZodMiniEnum<
  typeof InviteRequestEnvironment
> = z.enum(InviteRequestEnvironment);

/** @internal */
export const InviteRequestDeniedAction$outboundSchema: z.ZodMiniEnum<
  typeof InviteRequestDeniedAction
> = z.enum(InviteRequestDeniedAction);

/** @internal */
export type InviteRequest$Outbound = {
  role: string;
  email?: string | undefined;
  external_user_id?: string | undefined;
  environments?: Array<string> | undefined;
  denied_actions?: Array<string> | undefined;
};

/** @internal */
export const InviteRequest$outboundSchema: z.ZodMiniType<
  InviteRequest$Outbound,
  InviteRequest
> = z.pipe(
  z.object({
    role: Role$outboundSchema,
    email: z.optional(z.string()),
    externalUserId: z.optional(z.string()),
    environments: z.optional(z.array(InviteRequestEnvironment$outboundSchema)),
    deniedActions: z.optional(
      z.array(InviteRequestDeniedAction$outboundSchema),
    ),
  }),
  z.transform((v) => {
    return remap$(v, {
      externalUserId: "external_user_id",
      deniedActions: "denied_actions",
    });
  }),
);

export function inviteRequestToJSON(inviteRequest: InviteRequest): string {
  return JSON.stringify(InviteRequest$outboundSchema.parse(inviteRequest));
}
