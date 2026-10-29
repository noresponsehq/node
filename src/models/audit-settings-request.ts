import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

export type AuditSettingsRequest = {
  retentionDays: number;
};

/** @internal */
export type AuditSettingsRequest$Outbound = {
  retention_days: number;
};

/** @internal */
export const AuditSettingsRequest$outboundSchema: z.ZodMiniType<
  AuditSettingsRequest$Outbound,
  AuditSettingsRequest
> = z.pipe(
  z.object({
    retentionDays: z.int(),
  }),
  z.transform((v) => {
    return remap$(v, {
      retentionDays: "retention_days",
    });
  }),
);

export function auditSettingsRequestToJSON(
  auditSettingsRequest: AuditSettingsRequest,
): string {
  return JSON.stringify(
    AuditSettingsRequest$outboundSchema.parse(auditSettingsRequest),
  );
}
