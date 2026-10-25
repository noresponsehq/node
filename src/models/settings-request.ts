import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  SettingsRequestFlows,
  SettingsRequestFlows$Outbound,
  SettingsRequestFlows$outboundSchema,
} from "./settings-request-flows.js";
import { SourceId, SourceId$outboundSchema } from "./source-id.js";

/**
 * PATCH /v1/workspaces/{workspace_id}/settings/{environment} body. Changes only what it names, in one transaction; a policy change is one new policy_version. Needs the admin or owner role, or an API key with the management scope for its own environment.
 */
export type SettingsRequest = {
  retentionDays?: number | undefined;
  /**
   * Replaces the refused sources; [] refuses none. A change applies to new assessments within a minute.
   */
  refusedSources?: Array<SourceId> | undefined;
  /**
   * Use account_creation or its deprecated alias signup, not both.
   */
  flows?: SettingsRequestFlows | undefined;
};

/** @internal */
export type SettingsRequest$Outbound = {
  retention_days?: number | undefined;
  refused_sources?: Array<string> | undefined;
  flows?: SettingsRequestFlows$Outbound | undefined;
};

/** @internal */
export const SettingsRequest$outboundSchema: z.ZodMiniType<
  SettingsRequest$Outbound,
  SettingsRequest
> = z.pipe(
  z.object({
    retentionDays: z.optional(z.int()),
    refusedSources: z.optional(z.array(SourceId$outboundSchema)),
    flows: z.optional(SettingsRequestFlows$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      retentionDays: "retention_days",
      refusedSources: "refused_sources",
    });
  }),
);

export function settingsRequestToJSON(
  settingsRequest: SettingsRequest,
): string {
  return JSON.stringify(SettingsRequest$outboundSchema.parse(settingsRequest));
}
