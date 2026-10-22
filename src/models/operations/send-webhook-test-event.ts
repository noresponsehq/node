import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type SendWebhookTestEventRequest = {
  /**
   * The endpoint's whe_ id. An id that is unknown, malformed or another tenant's answers 404.
   */
  endpointId: string;
  body: models.WebhookTestRequest;
};

export type SendWebhookTestEventResponse = {
  headers: { [k: string]: Array<string> };
  result: models.WebhookTest;
};

/** @internal */
export type SendWebhookTestEventRequest$Outbound = {
  endpoint_id: string;
  body: models.WebhookTestRequest$Outbound;
};

/** @internal */
export const SendWebhookTestEventRequest$outboundSchema: z.ZodMiniType<
  SendWebhookTestEventRequest$Outbound,
  SendWebhookTestEventRequest
> = z.pipe(
  z.object({
    endpointId: z.string(),
    body: models.WebhookTestRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      endpointId: "endpoint_id",
    });
  }),
);

export function sendWebhookTestEventRequestToJSON(
  sendWebhookTestEventRequest: SendWebhookTestEventRequest,
): string {
  return JSON.stringify(
    SendWebhookTestEventRequest$outboundSchema.parse(
      sendWebhookTestEventRequest,
    ),
  );
}

/** @internal */
export const SendWebhookTestEventResponse$inboundSchema: z.ZodMiniType<
  SendWebhookTestEventResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.WebhookTest$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function sendWebhookTestEventResponseFromJSON(
  jsonString: string,
): SafeParseResult<SendWebhookTestEventResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SendWebhookTestEventResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SendWebhookTestEventResponse' from JSON`,
  );
}
