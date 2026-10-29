import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$inboundSchema,
} from "./audit-settings-environment.js";
import { Enforcements, Enforcements$inboundSchema } from "./enforcements.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Outcomes, Outcomes$inboundSchema } from "./outcomes.js";
import { Reviews, Reviews$inboundSchema } from "./reviews.js";

/**
 * Three separately defined populations with independent denominators. Interpret each section within its own population; their totals do not form a conversion funnel. All counts and retention come from one snapshot. Requests above the population or query budget are refused without truncation.
 */
export type WorkspaceOperationsSummary = {
  /**
   * The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.
   */
  workspaceId: string;
  environment: AuditSettingsEnvironment;
  from: string;
  to: string;
  asOf: string;
  retainedFrom: string;
  retentionDays: number;
  rowBudget: 100000;
  recordsRead: number;
  truncated: false;
  /**
   * Accounts whose current completed assessment was created in the selected window and remains retained at as_of. The effective account feedback head is observed at as_of, including explicit unknown reports. Customer-reported labels and unlabelled accounts have separate counts. Superseded labels are excluded.
   */
  outcomes: Outcomes;
  /**
   * Retained customer enforcement report rows created in [from,to), one row per account/risk_version/flow/action. A later applied report can replace failed at the original created_at; retries are not additional attempts here. applied_coverage divides reported_applied by report rows, including explicit action none; it is not independently verified execution, all requested actions, or prevented fraud. Unreported actions are unknown.
   */
  enforcements: Enforcements;
  /**
   * Reviews created in [from,to) whose review and current account assessment remain retained. Status and assignment are current at as_of, not a transition history. label_coverage numerator is resolved reviews labeled benign or abuse; denominator is resolved reviews. Inconclusive is not a known outcome. Review conclusions do not change account feedback or enforcement.
   */
  reviews: Reviews;
};

/** @internal */
export const WorkspaceOperationsSummary$inboundSchema: z.ZodMiniType<
  WorkspaceOperationsSummary,
  unknown
> = z.pipe(
  z.object({
    workspace_id: types.string(),
    environment: AuditSettingsEnvironment$inboundSchema,
    from: types.string(),
    to: types.string(),
    as_of: types.string(),
    retained_from: types.string(),
    retention_days: types.number(),
    row_budget: types.literal(100000),
    records_read: types.number(),
    truncated: types.literal(false),
    outcomes: Outcomes$inboundSchema,
    enforcements: Enforcements$inboundSchema,
    reviews: Reviews$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "workspace_id": "workspaceId",
      "as_of": "asOf",
      "retained_from": "retainedFrom",
      "retention_days": "retentionDays",
      "row_budget": "rowBudget",
      "records_read": "recordsRead",
    });
  }),
);

export function workspaceOperationsSummaryFromJSON(
  jsonString: string,
): SafeParseResult<WorkspaceOperationsSummary, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkspaceOperationsSummary$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkspaceOperationsSummary' from JSON`,
  );
}
