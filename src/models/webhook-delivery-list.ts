import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  WebhookDeliveryAttempt,
  WebhookDeliveryAttempt$inboundSchema,
} from "./webhook-delivery-attempt.js";

/**
 * The 200 answer of GET /v1/webhooks/{endpoint_id}/deliveries: one page of the endpoint's delivery attempts, newest first. Each item is one POST to the endpoint. Attempts are kept for 30 days, or the workspace's retention_days when that is shorter, and are deleted with the assessment they carried. next_cursor is present only when another page exists.
 */
export type WebhookDeliveryList = {
  /**
   * Opaque id of the endpoint registration.
   */
  endpointId: string;
  items: Array<WebhookDeliveryAttempt>;
  /**
   * Opaque cursor for the next page, MAC'd by the server and bound to the workspace and endpoint it was issued for. Pass it back unchanged as cursor; a tampered, foreign or expired cursor answers 400 invalid_cursor.
   */
  nextCursor?: string | undefined;
};

/** @internal */
export const WebhookDeliveryList$inboundSchema: z.ZodMiniType<
  WebhookDeliveryList,
  unknown
> = z.pipe(
  z.object({
    endpoint_id: types.string(),
    items: z.array(WebhookDeliveryAttempt$inboundSchema),
    next_cursor: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "endpoint_id": "endpointId",
      "next_cursor": "nextCursor",
    });
  }),
);

export function webhookDeliveryListFromJSON(
  jsonString: string,
): SafeParseResult<WebhookDeliveryList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookDeliveryList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookDeliveryList' from JSON`,
  );
}
