import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type EndpointVerification = {
  /**
   * Opaque id of the endpoint registration being verified.
   */
  endpointId: string;
  /**
   * Endpoint verification nonce: 32 random bytes, unpadded base64url (43 characters). Fresh per verification.
   */
  challenge: string;
};

/** @internal */
export const EndpointVerification$inboundSchema: z.ZodMiniType<
  EndpointVerification,
  unknown
> = z.pipe(
  z.object({
    endpoint_id: types.string(),
    challenge: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "endpoint_id": "endpointId",
    });
  }),
);
/** @internal */
export type EndpointVerification$Outbound = {
  endpoint_id: string;
  challenge: string;
};

/** @internal */
export const EndpointVerification$outboundSchema: z.ZodMiniType<
  EndpointVerification$Outbound,
  EndpointVerification
> = z.pipe(
  z.object({
    endpointId: z.string(),
    challenge: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      endpointId: "endpoint_id",
    });
  }),
);

export function endpointVerificationToJSON(
  endpointVerification: EndpointVerification,
): string {
  return JSON.stringify(
    EndpointVerification$outboundSchema.parse(endpointVerification),
  );
}
export function endpointVerificationFromJSON(
  jsonString: string,
): SafeParseResult<EndpointVerification, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => EndpointVerification$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'EndpointVerification' from JSON`,
  );
}
