import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted.
 */
export const Metric = {
  Assessments: "assessments",
  WebhookDeliveries: "webhook_deliveries",
  KeyUsageEvents: "key_usage_events",
} as const;
/**
 * assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted.
 */
export type Metric = OpenEnum<typeof Metric>;

/** @internal */
export const Metric$inboundSchema: z.ZodMiniType<Metric, unknown> = openEnums
  .inboundSchema(Metric);
