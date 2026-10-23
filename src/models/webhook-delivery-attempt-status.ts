import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * delivered when the endpoint answered 2xx; failed otherwise, with failure naming why.
 */
export const WebhookDeliveryAttemptStatus = {
  Delivered: "delivered",
  Failed: "failed",
} as const;
/**
 * delivered when the endpoint answered 2xx; failed otherwise, with failure naming why.
 */
export type WebhookDeliveryAttemptStatus = OpenEnum<
  typeof WebhookDeliveryAttemptStatus
>;

/** @internal */
export const WebhookDeliveryAttemptStatus$inboundSchema: z.ZodMiniType<
  WebhookDeliveryAttemptStatus,
  unknown
> = openEnums.inboundSchema(WebhookDeliveryAttemptStatus);
