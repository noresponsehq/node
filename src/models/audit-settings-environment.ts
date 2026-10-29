import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const AuditSettingsEnvironment = {
  Live: "live",
  Test: "test",
} as const;
export type AuditSettingsEnvironment = OpenEnum<
  typeof AuditSettingsEnvironment
>;

/** @internal */
export const AuditSettingsEnvironment$inboundSchema: z.ZodMiniType<
  AuditSettingsEnvironment,
  unknown
> = openEnums.inboundSchema(AuditSettingsEnvironment);
/** @internal */
export const AuditSettingsEnvironment$outboundSchema: z.ZodMiniType<
  string,
  AuditSettingsEnvironment
> = openEnums.outboundSchema(AuditSettingsEnvironment);
