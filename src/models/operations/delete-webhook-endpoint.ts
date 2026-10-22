import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";

export type DeleteWebhookEndpointRequest = {
  /**
   * The endpoint's whe_ id. An id that is unknown, malformed or another tenant's answers 404.
   */
  endpointId: string;
};

export type DeleteWebhookEndpointResponse = {
  headers: { [k: string]: Array<string> };
};

/** @internal */
export type DeleteWebhookEndpointRequest$Outbound = {
  endpoint_id: string;
};

/** @internal */
export const DeleteWebhookEndpointRequest$outboundSchema: z.ZodMiniType<
  DeleteWebhookEndpointRequest$Outbound,
  DeleteWebhookEndpointRequest
> = z.pipe(
  z.object({
    endpointId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      endpointId: "endpoint_id",
    });
  }),
);

export function deleteWebhookEndpointRequestToJSON(
  deleteWebhookEndpointRequest: DeleteWebhookEndpointRequest,
): string {
  return JSON.stringify(
    DeleteWebhookEndpointRequest$outboundSchema.parse(
      deleteWebhookEndpointRequest,
    ),
  );
}

/** @internal */
export const DeleteWebhookEndpointResponse$inboundSchema: z.ZodMiniType<
  DeleteWebhookEndpointResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
    });
  }),
);

export function deleteWebhookEndpointResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteWebhookEndpointResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteWebhookEndpointResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteWebhookEndpointResponse' from JSON`,
  );
}
