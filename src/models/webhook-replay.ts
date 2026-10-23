import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The 202 answer of POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay: the event queued to be sent again.
 */
export type WebhookReplay = {
  /**
   * Opaque id of the endpoint registration.
   */
  endpointId: string;
  /**
   * The replayed event's id. The receiver sees the same id and body as the first time, with a new NR-Webhook-Timestamp and signature.
   */
  eventId: string;
  /**
   * The event's type, as its body's type: assessment.updated, account.deleted or account.risk_changed.
   */
  eventType: string;
};

/** @internal */
export const WebhookReplay$inboundSchema: z.ZodMiniType<
  WebhookReplay,
  unknown
> = z.pipe(
  z.object({
    endpoint_id: types.string(),
    event_id: types.string(),
    event_type: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "endpoint_id": "endpointId",
      "event_id": "eventId",
      "event_type": "eventType",
    });
  }),
);

export function webhookReplayFromJSON(
  jsonString: string,
): SafeParseResult<WebhookReplay, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookReplay$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookReplay' from JSON`,
  );
}
