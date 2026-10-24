import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * One of the environment's endpoints stopped receiving events: every delivery attempt to it failed from failing_since until disabled_at, 72 hours or more. Its queued deliveries are dropped. Fix the receiver and verify it again with POST /v1/webhooks/{endpoint_id}/test (type endpoint.verification) to resume delivery.
 */
export type WebhookEndpointDisabled = {
  /**
   * The endpoint that was disabled.
   */
  endpointId: string;
  /**
   * The first failed attempt of the unbroken failure streak.
   */
  failingSince: string;
  /**
   * When the endpoint was disabled; equal to the event's created_at.
   */
  disabledAt: string;
};

/** @internal */
export const WebhookEndpointDisabled$inboundSchema: z.ZodMiniType<
  WebhookEndpointDisabled,
  unknown
> = z.pipe(
  z.object({
    endpoint_id: types.string(),
    failing_since: types.string(),
    disabled_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "endpoint_id": "endpointId",
      "failing_since": "failingSince",
      "disabled_at": "disabledAt",
    });
  }),
);
/** @internal */
export type WebhookEndpointDisabled$Outbound = {
  endpoint_id: string;
  failing_since: string;
  disabled_at: string;
};

/** @internal */
export const WebhookEndpointDisabled$outboundSchema: z.ZodMiniType<
  WebhookEndpointDisabled$Outbound,
  WebhookEndpointDisabled
> = z.pipe(
  z.object({
    endpointId: z.string(),
    failingSince: z.string(),
    disabledAt: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      endpointId: "endpoint_id",
      failingSince: "failing_since",
      disabledAt: "disabled_at",
    });
  }),
);

export function webhookEndpointDisabledToJSON(
  webhookEndpointDisabled: WebhookEndpointDisabled,
): string {
  return JSON.stringify(
    WebhookEndpointDisabled$outboundSchema.parse(webhookEndpointDisabled),
  );
}
export function webhookEndpointDisabledFromJSON(
  jsonString: string,
): SafeParseResult<WebhookEndpointDisabled, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookEndpointDisabled$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookEndpointDisabled' from JSON`,
  );
}
