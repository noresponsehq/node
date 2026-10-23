import * as z from "zod/v4-mini";

/**
 * POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay body: an empty object.
 */
export type WebhookReplayRequest = {};

/** @internal */
export type WebhookReplayRequest$Outbound = {};

/** @internal */
export const WebhookReplayRequest$outboundSchema: z.ZodMiniType<
  WebhookReplayRequest$Outbound,
  WebhookReplayRequest
> = z.object({});

export function webhookReplayRequestToJSON(
  webhookReplayRequest: WebhookReplayRequest,
): string {
  return JSON.stringify(
    WebhookReplayRequest$outboundSchema.parse(webhookReplayRequest),
  );
}
