import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The kind of resource the change acted on.
 */
export const AuditEventTargetType = {
  Workspace: "workspace",
  Member: "member",
  Invite: "invite",
  Key: "key",
  Setting: "setting",
  WebhookEndpoint: "webhook_endpoint",
  Integration: "integration",
  Billing: "billing",
  Review: "review",
} as const;
/**
 * The kind of resource the change acted on.
 */
export type AuditEventTargetType = OpenEnum<typeof AuditEventTargetType>;

/** @internal */
export const AuditEventTargetType$inboundSchema: z.ZodMiniType<
  AuditEventTargetType,
  unknown
> = openEnums.inboundSchema(AuditEventTargetType);
/** @internal */
export const AuditEventTargetType$outboundSchema: z.ZodMiniType<
  string,
  AuditEventTargetType
> = openEnums.outboundSchema(AuditEventTargetType);
