import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  WebhookEndpointDisabled,
  WebhookEndpointDisabled$inboundSchema,
  WebhookEndpointDisabled$Outbound,
  WebhookEndpointDisabled$outboundSchema,
} from "./webhook-endpoint-disabled.js";

/**
 * The webhook_endpoint.disabled event.
 */
export type WebhookEndpointDisabledEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always webhook_endpoint.disabled.
   */
  type: "webhook_endpoint.disabled";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  /**
   * One of the environment's endpoints stopped receiving events: every delivery attempt to it failed from failing_since until disabled_at, 72 hours or more. Its queued deliveries are dropped. Fix the receiver and verify it again with POST /v1/webhooks/{endpoint_id}/test (type endpoint.verification) to resume delivery.
   */
  data: WebhookEndpointDisabled;
};

/** @internal */
export const WebhookEndpointDisabledEvent$inboundSchema: z.ZodMiniType<
  WebhookEndpointDisabledEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("webhook_endpoint.disabled"),
    test: types.optional(types.boolean()),
    data: WebhookEndpointDisabled$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type WebhookEndpointDisabledEvent$Outbound = {
  id: string;
  created_at: string;
  type: "webhook_endpoint.disabled";
  test?: boolean | undefined;
  data: WebhookEndpointDisabled$Outbound;
};

/** @internal */
export const WebhookEndpointDisabledEvent$outboundSchema: z.ZodMiniType<
  WebhookEndpointDisabledEvent$Outbound,
  WebhookEndpointDisabledEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("webhook_endpoint.disabled"),
    test: z.optional(z.boolean()),
    data: WebhookEndpointDisabled$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function webhookEndpointDisabledEventToJSON(
  webhookEndpointDisabledEvent: WebhookEndpointDisabledEvent,
): string {
  return JSON.stringify(
    WebhookEndpointDisabledEvent$outboundSchema.parse(
      webhookEndpointDisabledEvent,
    ),
  );
}
export function webhookEndpointDisabledEventFromJSON(
  jsonString: string,
): SafeParseResult<WebhookEndpointDisabledEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookEndpointDisabledEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookEndpointDisabledEvent' from JSON`,
  );
}
