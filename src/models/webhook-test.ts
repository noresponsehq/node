import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  WebhookEndpointState,
  WebhookEndpointState$inboundSchema,
} from "./webhook-endpoint-state.js";
import {
  WebhookTestRequestEvent,
  WebhookTestRequestEvent$inboundSchema,
} from "./webhook-test-request-event.js";

/**
 * The 202 answer of POST /v1/webhooks/{endpoint_id}/test: the event that was sent or queued.
 */
export type WebhookTest = {
  /**
   * The event id the receiver sees as NR-Webhook-Id and as the body's id.
   */
  deliveryId: string;
  /**
   * Opaque id of the endpoint registration.
   */
  endpointId: string;
  /**
   * endpoint.verification sends a fresh challenge now, in this call, and the endpoint is verified if it echoes it. assessment.updated queues an event whose data is a fixed example assessment, with test true, delivered and retried like any other; the endpoint must be verified.
   */
  event: WebhookTestRequestEvent;
  /**
   * unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.
   */
  state: WebhookEndpointState;
  /**
   * endpoint.verification only: true when the endpoint echoed the challenge within 5 seconds. A false answer leaves the endpoint's state as it was.
   */
  verified?: boolean | undefined;
};

/** @internal */
export const WebhookTest$inboundSchema: z.ZodMiniType<WebhookTest, unknown> = z
  .pipe(
    z.object({
      delivery_id: types.string(),
      endpoint_id: types.string(),
      event: WebhookTestRequestEvent$inboundSchema,
      state: WebhookEndpointState$inboundSchema,
      verified: types.optional(types.boolean()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "delivery_id": "deliveryId",
        "endpoint_id": "endpointId",
      });
    }),
  );

export function webhookTestFromJSON(
  jsonString: string,
): SafeParseResult<WebhookTest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookTest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookTest' from JSON`,
  );
}
