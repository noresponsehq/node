import * as z from "zod/v4-mini";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$outboundSchema,
} from "./audit-settings-environment.js";

/**
 * Read a past [from,to) interval of at most 31 days. The complete retained populations must fit a combined 100000-row budget and a 1500ms SQL statement budget. No pagination or sampled totals; choose a shorter interval after a row-budget refusal.
 */
export type WorkspaceOperationsSummaryRequest = {
  environment: AuditSettingsEnvironment;
  from: string;
  to: string;
};

/** @internal */
export type WorkspaceOperationsSummaryRequest$Outbound = {
  environment: string;
  from: string;
  to: string;
};

/** @internal */
export const WorkspaceOperationsSummaryRequest$outboundSchema: z.ZodMiniType<
  WorkspaceOperationsSummaryRequest$Outbound,
  WorkspaceOperationsSummaryRequest
> = z.object({
  environment: AuditSettingsEnvironment$outboundSchema,
  from: z.string(),
  to: z.string(),
});

export function workspaceOperationsSummaryRequestToJSON(
  workspaceOperationsSummaryRequest: WorkspaceOperationsSummaryRequest,
): string {
  return JSON.stringify(
    WorkspaceOperationsSummaryRequest$outboundSchema.parse(
      workspaceOperationsSummaryRequest,
    ),
  );
}
