import * as z from "zod/v4-mini";

/**
 * POST /v1/webhooks/{endpoint_id}/rotate body: an empty object. The old key keeps verifying for 7 days.
 */
export type WebhookKeyRotationRequest = {};

/** @internal */
export type WebhookKeyRotationRequest$Outbound = {};

/** @internal */
export const WebhookKeyRotationRequest$outboundSchema: z.ZodMiniType<
  WebhookKeyRotationRequest$Outbound,
  WebhookKeyRotationRequest
> = z.object({});

export function webhookKeyRotationRequestToJSON(
  webhookKeyRotationRequest: WebhookKeyRotationRequest,
): string {
  return JSON.stringify(
    WebhookKeyRotationRequest$outboundSchema.parse(webhookKeyRotationRequest),
  );
}
