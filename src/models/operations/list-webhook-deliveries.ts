import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListWebhookDeliveriesRequest = {
  /**
   * The endpoint's whe_ id. An id that is unknown, malformed or another tenant's answers 404.
   */
  endpointId: string;
  /**
   * Attempts per page.
   */
  limit?: number | undefined;
  /**
   * next_cursor from the previous page, unchanged.
   */
  cursor?: string | undefined;
};

export type ListWebhookDeliveriesResponse = {
  headers: { [k: string]: Array<string> };
  result: models.WebhookDeliveryList;
};

/** @internal */
export type ListWebhookDeliveriesRequest$Outbound = {
  endpoint_id: string;
  limit: number;
  cursor?: string | undefined;
};

/** @internal */
export const ListWebhookDeliveriesRequest$outboundSchema: z.ZodMiniType<
  ListWebhookDeliveriesRequest$Outbound,
  ListWebhookDeliveriesRequest
> = z.pipe(
  z.object({
    endpointId: z.string(),
    limit: z._default(z.int(), 20),
    cursor: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      endpointId: "endpoint_id",
    });
  }),
);

export function listWebhookDeliveriesRequestToJSON(
  listWebhookDeliveriesRequest: ListWebhookDeliveriesRequest,
): string {
  return JSON.stringify(
    ListWebhookDeliveriesRequest$outboundSchema.parse(
      listWebhookDeliveriesRequest,
    ),
  );
}

/** @internal */
export const ListWebhookDeliveriesResponse$inboundSchema: z.ZodMiniType<
  ListWebhookDeliveriesResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.WebhookDeliveryList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listWebhookDeliveriesResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListWebhookDeliveriesResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListWebhookDeliveriesResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListWebhookDeliveriesResponse' from JSON`,
  );
}
