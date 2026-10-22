import * as z from "zod/v4-mini";
import {
  WebhookTestRequestEvent,
  WebhookTestRequestEvent$outboundSchema,
} from "./webhook-test-request-event.js";

/**
 * POST /v1/webhooks/{endpoint_id}/test body: which event to send.
 */
export type WebhookTestRequest = {
  /**
   * endpoint.verification sends a fresh challenge now, in this call, and the endpoint is verified if it echoes it. assessment.updated queues an event whose data is a fixed example assessment, with test true, delivered and retried like any other; the endpoint must be verified.
   */
  event: WebhookTestRequestEvent;
};

/** @internal */
export type WebhookTestRequest$Outbound = {
  event: string;
};

/** @internal */
export const WebhookTestRequest$outboundSchema: z.ZodMiniType<
  WebhookTestRequest$Outbound,
  WebhookTestRequest
> = z.object({
  event: WebhookTestRequestEvent$outboundSchema,
});

export function webhookTestRequestToJSON(
  webhookTestRequest: WebhookTestRequest,
): string {
  return JSON.stringify(
    WebhookTestRequest$outboundSchema.parse(webhookTestRequest),
  );
}
