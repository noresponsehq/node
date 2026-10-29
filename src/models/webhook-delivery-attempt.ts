import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Failure, Failure$inboundSchema } from "./failure.js";
import {
  WebhookDeliveryAttemptStatus,
  WebhookDeliveryAttemptStatus$inboundSchema,
} from "./webhook-delivery-attempt-status.js";

export type WebhookDeliveryAttempt = {
  /**
   * The event id the receiver saw as NR-Webhook-Id and as the body's id. Replay it with POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay.
   */
  eventId: string;
  /**
   * The event's type, as its body's type: assessment.updated, endpoint.verification, account.deleted, workspace.deleted, webhook_endpoint.disabled, account.risk_changed, audit.event, or a type added later.
   */
  eventType: string;
  /**
   * Which attempt of this delivery this was: 1 for the first send, up to 9 with retries. A replay counts its own attempts from 1.
   */
  attempt: number;
  /**
   * true for an attempt of a replay you asked for.
   */
  replay: boolean;
  /**
   * delivered when the endpoint answered 2xx; failed otherwise, with failure naming why.
   */
  status: WebhookDeliveryAttemptStatus;
  /**
   * The HTTP status the endpoint answered. Absent when no response was read.
   */
  responseCode?: number | undefined;
  /**
   * Why the attempt failed: the URL is no longer valid, the host did not resolve, it resolved to an address that is not public, no answer within 5 seconds, the connection failed, a 3xx (redirects are not followed) or another non-2xx status. Absent for a delivered attempt.
   */
  failure?: Failure | undefined;
  /**
   * Milliseconds from sending the request to the answer or the failure.
   */
  latencyMs: number;
  /**
   * When the request was sent. Its NR-Webhook-Timestamp is this time in Unix seconds.
   */
  attemptedAt: string;
};

/** @internal */
export const WebhookDeliveryAttempt$inboundSchema: z.ZodMiniType<
  WebhookDeliveryAttempt,
  unknown
> = z.pipe(
  z.object({
    event_id: types.string(),
    event_type: types.string(),
    attempt: types.number(),
    replay: types.boolean(),
    status: WebhookDeliveryAttemptStatus$inboundSchema,
    response_code: types.optional(types.number()),
    failure: types.optional(Failure$inboundSchema),
    latency_ms: types.number(),
    attempted_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "event_id": "eventId",
      "event_type": "eventType",
      "response_code": "responseCode",
      "latency_ms": "latencyMs",
      "attempted_at": "attemptedAt",
    });
  }),
);

export function webhookDeliveryAttemptFromJSON(
  jsonString: string,
): SafeParseResult<WebhookDeliveryAttempt, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookDeliveryAttempt$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookDeliveryAttempt' from JSON`,
  );
}
