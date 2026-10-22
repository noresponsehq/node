import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { ResponseMode, ResponseMode$outboundSchema } from "./response-mode.js";

/**
 * POST /v1/webhooks body. The tenant is the API key that signs the request, so it is not a body member. The URL must be https on port 443 or 8443 with a DNS name, not an IP literal, and every address the name resolves to must be public.
 */
export type WebhookEndpointRequest = {
  /**
   * Where deliveries are sent: an https URL on port 443 or 8443, with a DNS host and no userinfo or fragment, at most 2048 characters.
   */
  url: string;
  /**
   * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
   */
  responseMode?: ResponseMode | undefined;
};

/** @internal */
export type WebhookEndpointRequest$Outbound = {
  url: string;
  response_mode?: string | undefined;
};

/** @internal */
export const WebhookEndpointRequest$outboundSchema: z.ZodMiniType<
  WebhookEndpointRequest$Outbound,
  WebhookEndpointRequest
> = z.pipe(
  z.object({
    url: z.string(),
    responseMode: z.optional(ResponseMode$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      responseMode: "response_mode",
    });
  }),
);

export function webhookEndpointRequestToJSON(
  webhookEndpointRequest: WebhookEndpointRequest,
): string {
  return JSON.stringify(
    WebhookEndpointRequest$outboundSchema.parse(webhookEndpointRequest),
  );
}
