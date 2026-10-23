import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ReplayWebhookDeliveryRequest = {
  /**
   * The endpoint's whe_ id. An id that is unknown, malformed or another workspace's answers 404.
   */
  endpointId: string;
  /**
   * The evt_ id of a delivery the endpoint's log holds, as GET /v1/webhooks/{endpoint_id}/deliveries lists it. An id that is malformed, not sent to this endpoint, past the log's retention or another workspace's answers 404.
   */
  eventId: string;
  body: models.WebhookReplayRequest;
};

export type ReplayWebhookDeliveryResponse = {
  headers: { [k: string]: Array<string> };
  result: models.WebhookReplay;
};

/** @internal */
export type ReplayWebhookDeliveryRequest$Outbound = {
  endpoint_id: string;
  event_id: string;
  body: models.WebhookReplayRequest$Outbound;
};

/** @internal */
export const ReplayWebhookDeliveryRequest$outboundSchema: z.ZodMiniType<
  ReplayWebhookDeliveryRequest$Outbound,
  ReplayWebhookDeliveryRequest
> = z.pipe(
  z.object({
    endpointId: z.string(),
    eventId: z.string(),
    body: models.WebhookReplayRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      endpointId: "endpoint_id",
      eventId: "event_id",
    });
  }),
);

export function replayWebhookDeliveryRequestToJSON(
  replayWebhookDeliveryRequest: ReplayWebhookDeliveryRequest,
): string {
  return JSON.stringify(
    ReplayWebhookDeliveryRequest$outboundSchema.parse(
      replayWebhookDeliveryRequest,
    ),
  );
}

/** @internal */
export const ReplayWebhookDeliveryResponse$inboundSchema: z.ZodMiniType<
  ReplayWebhookDeliveryResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.WebhookReplay$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function replayWebhookDeliveryResponseFromJSON(
  jsonString: string,
): SafeParseResult<ReplayWebhookDeliveryResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReplayWebhookDeliveryResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReplayWebhookDeliveryResponse' from JSON`,
  );
}
