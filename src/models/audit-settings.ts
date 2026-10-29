import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$inboundSchema,
} from "./audit-settings-environment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Read audit retention and available history.
 */
export type AuditSettings = {
  environment: AuditSettingsEnvironment;
  retentionDays: number;
  oldestAvailableAt?: string | undefined;
  capture: "available_events_only";
};

/** @internal */
export const AuditSettings$inboundSchema: z.ZodMiniType<
  AuditSettings,
  unknown
> = z.pipe(
  z.object({
    environment: AuditSettingsEnvironment$inboundSchema,
    retention_days: types.number(),
    oldest_available_at: types.optional(types.string()),
    capture: types.literal("available_events_only"),
  }),
  z.transform((v) => {
    return remap$(v, {
      "retention_days": "retentionDays",
      "oldest_available_at": "oldestAvailableAt",
    });
  }),
);

export function auditSettingsFromJSON(
  jsonString: string,
): SafeParseResult<AuditSettings, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AuditSettings$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AuditSettings' from JSON`,
  );
}
