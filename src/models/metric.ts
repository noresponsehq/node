import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted. screenings: attendees a screening recorded a final result for, one per attendee per screening; a failed attendee counts only when its lookups were kept.
 */
export const Metric = {
  Assessments: "assessments",
  WebhookDeliveries: "webhook_deliveries",
  KeyUsageEvents: "key_usage_events",
  Screenings: "screenings",
} as const;
/**
 * assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted. screenings: attendees a screening recorded a final result for, one per attendee per screening; a failed attendee counts only when its lookups were kept.
 */
export type Metric = OpenEnum<typeof Metric>;

/** @internal */
export const Metric$inboundSchema: z.ZodMiniType<Metric, unknown> = openEnums
  .inboundSchema(Metric);
