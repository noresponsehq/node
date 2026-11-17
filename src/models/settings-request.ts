import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  EnrichmentChange,
  EnrichmentChange$Outbound,
  EnrichmentChange$outboundSchema,
} from "./enrichment-change.js";
import {
  SettingsRequestFlows,
  SettingsRequestFlows$Outbound,
  SettingsRequestFlows$outboundSchema,
} from "./settings-request-flows.js";

/**
 * Changes only named settings, atomically. Every successful write advances policy_version and retains an immutable settings snapshot. expected_policy_version optionally guards against stale edits; restore always requires it.
 */
export type SettingsRequest = {
  retentionDays?: number | undefined;
  /**
   * Replaces the refused sources; [] refuses none. A change applies to new assessments within a minute.
   */
  refusedSources?: Array<string> | undefined;
  /**
   * Replaces the daily screening cap, in minor units of USD; null removes the cap. Needs settings.write only, like retention_days.
   */
  screeningDailyCap?: number | null | undefined;
  /**
   * A change to enrichment. A field left out keeps the value in force; max_spend or deadline null removes the bound.
   */
  enrichment?: EnrichmentChange | undefined;
  /**
   * Use account_creation or its deprecated alias signup, not both.
   */
  flows?: SettingsRequestFlows | undefined;
  /**
   * Compare-and-set guard. A stale version returns 409 policy_version_conflict before any change; every settings write including retention advances the version.
   */
  expectedPolicyVersion?: number | undefined;
  changeReason?: string | undefined;
};

/** @internal */
export type SettingsRequest$Outbound = {
  retention_days?: number | undefined;
  refused_sources?: Array<string> | undefined;
  screening_daily_cap?: number | null | undefined;
  enrichment?: EnrichmentChange$Outbound | undefined;
  flows?: SettingsRequestFlows$Outbound | undefined;
  expected_policy_version?: number | undefined;
  change_reason?: string | undefined;
};

/** @internal */
export const SettingsRequest$outboundSchema: z.ZodMiniType<
  SettingsRequest$Outbound,
  SettingsRequest
> = z.pipe(
  z.object({
    retentionDays: z.optional(z.int()),
    refusedSources: z.optional(z.array(z.string())),
    screeningDailyCap: z.optional(z.nullable(z.int())),
    enrichment: z.optional(EnrichmentChange$outboundSchema),
    flows: z.optional(SettingsRequestFlows$outboundSchema),
    expectedPolicyVersion: z.optional(z.int()),
    changeReason: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      retentionDays: "retention_days",
      refusedSources: "refused_sources",
      screeningDailyCap: "screening_daily_cap",
      expectedPolicyVersion: "expected_policy_version",
      changeReason: "change_reason",
    });
  }),
);

export function settingsRequestToJSON(
  settingsRequest: SettingsRequest,
): string {
  return JSON.stringify(SettingsRequest$outboundSchema.parse(settingsRequest));
}
