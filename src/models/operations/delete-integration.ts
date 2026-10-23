import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";

export type DeleteIntegrationRequest = {
  /**
   * Path segment, matched case-sensitively. A value that does not match the integration_id shape, or another workspace's id, answers 404.
   */
  integrationId: string;
};

export type DeleteIntegrationResponse = {
  headers: { [k: string]: Array<string> };
};

/** @internal */
export type DeleteIntegrationRequest$Outbound = {
  integration_id: string;
};

/** @internal */
export const DeleteIntegrationRequest$outboundSchema: z.ZodMiniType<
  DeleteIntegrationRequest$Outbound,
  DeleteIntegrationRequest
> = z.pipe(
  z.object({
    integrationId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      integrationId: "integration_id",
    });
  }),
);

export function deleteIntegrationRequestToJSON(
  deleteIntegrationRequest: DeleteIntegrationRequest,
): string {
  return JSON.stringify(
    DeleteIntegrationRequest$outboundSchema.parse(deleteIntegrationRequest),
  );
}

/** @internal */
export const DeleteIntegrationResponse$inboundSchema: z.ZodMiniType<
  DeleteIntegrationResponse,
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

export function deleteIntegrationResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteIntegrationResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteIntegrationResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteIntegrationResponse' from JSON`,
  );
}
