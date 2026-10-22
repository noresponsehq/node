import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RotateIntegrationSecretRequest = {
  /**
   * Path segment, matched case-sensitively. A value that does not match the integration_id shape, or another tenant's id, answers 404.
   */
  integrationId: string;
  body: models.IntegrationRotationRequest;
};

export type RotateIntegrationSecretResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Integration;
};

/** @internal */
export type RotateIntegrationSecretRequest$Outbound = {
  integration_id: string;
  body: models.IntegrationRotationRequest$Outbound;
};

/** @internal */
export const RotateIntegrationSecretRequest$outboundSchema: z.ZodMiniType<
  RotateIntegrationSecretRequest$Outbound,
  RotateIntegrationSecretRequest
> = z.pipe(
  z.object({
    integrationId: z.string(),
    body: models.IntegrationRotationRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      integrationId: "integration_id",
    });
  }),
);

export function rotateIntegrationSecretRequestToJSON(
  rotateIntegrationSecretRequest: RotateIntegrationSecretRequest,
): string {
  return JSON.stringify(
    RotateIntegrationSecretRequest$outboundSchema.parse(
      rotateIntegrationSecretRequest,
    ),
  );
}

/** @internal */
export const RotateIntegrationSecretResponse$inboundSchema: z.ZodMiniType<
  RotateIntegrationSecretResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Integration$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function rotateIntegrationSecretResponseFromJSON(
  jsonString: string,
): SafeParseResult<RotateIntegrationSecretResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RotateIntegrationSecretResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RotateIntegrationSecretResponse' from JSON`,
  );
}
