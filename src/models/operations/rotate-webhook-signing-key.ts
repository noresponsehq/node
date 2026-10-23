import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RotateWebhookSigningKeyRequest = {
  /**
   * The endpoint's whe_ id. An id that is unknown, malformed or another workspace's answers 404.
   */
  endpointId: string;
  body: models.WebhookKeyRotationRequest;
};

export type RotateWebhookSigningKeyResponse = {
  headers: { [k: string]: Array<string> };
  result: models.WebhookKeyRotation;
};

/** @internal */
export type RotateWebhookSigningKeyRequest$Outbound = {
  endpoint_id: string;
  body: models.WebhookKeyRotationRequest$Outbound;
};

/** @internal */
export const RotateWebhookSigningKeyRequest$outboundSchema: z.ZodMiniType<
  RotateWebhookSigningKeyRequest$Outbound,
  RotateWebhookSigningKeyRequest
> = z.pipe(
  z.object({
    endpointId: z.string(),
    body: models.WebhookKeyRotationRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      endpointId: "endpoint_id",
    });
  }),
);

export function rotateWebhookSigningKeyRequestToJSON(
  rotateWebhookSigningKeyRequest: RotateWebhookSigningKeyRequest,
): string {
  return JSON.stringify(
    RotateWebhookSigningKeyRequest$outboundSchema.parse(
      rotateWebhookSigningKeyRequest,
    ),
  );
}

/** @internal */
export const RotateWebhookSigningKeyResponse$inboundSchema: z.ZodMiniType<
  RotateWebhookSigningKeyResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.WebhookKeyRotation$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function rotateWebhookSigningKeyResponseFromJSON(
  jsonString: string,
): SafeParseResult<RotateWebhookSigningKeyResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RotateWebhookSigningKeyResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RotateWebhookSigningKeyResponse' from JSON`,
  );
}
