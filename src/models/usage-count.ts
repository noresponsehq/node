import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$inboundSchema,
} from "./audit-settings-environment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Metric, Metric$inboundSchema } from "./metric.js";
import {
  UsageCountDepth,
  UsageCountDepth$inboundSchema,
} from "./usage-count-depth.js";
import {
  UsageCountFlow,
  UsageCountFlow$inboundSchema,
} from "./usage-count-flow.js";

export type UsageCount = {
  environment: AuditSettingsEnvironment;
  day: string;
  /**
   * assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted.
   */
  metric: Metric;
  /**
   * assessments only.
   */
  flow?: UsageCountFlow | undefined;
  /**
   * assessments only.
   */
  depth?: UsageCountDepth | undefined;
  count: number;
};

/** @internal */
export const UsageCount$inboundSchema: z.ZodMiniType<UsageCount, unknown> = z
  .object({
    environment: AuditSettingsEnvironment$inboundSchema,
    day: types.string(),
    metric: Metric$inboundSchema,
    flow: types.optional(UsageCountFlow$inboundSchema),
    depth: types.optional(UsageCountDepth$inboundSchema),
    count: types.number(),
  });

export function usageCountFromJSON(
  jsonString: string,
): SafeParseResult<UsageCount, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UsageCount$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UsageCount' from JSON`,
  );
}
