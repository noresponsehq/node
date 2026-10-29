import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.
 */
export const Role = {
  Owner: "owner",
  Admin: "admin",
  Developer: "developer",
  Viewer: "viewer",
  Investigator: "investigator",
  Auditor: "auditor",
  Billing: "billing",
} as const;
/**
 * A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.
 */
export type Role = OpenEnum<typeof Role>;

/** @internal */
export const Role$inboundSchema: z.ZodMiniType<Role, unknown> = openEnums
  .inboundSchema(Role);
/** @internal */
export const Role$outboundSchema: z.ZodMiniType<string, Role> = openEnums
  .outboundSchema(Role);
