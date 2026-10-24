import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The body an endpoint returns, with status 200 and Content-Type application/json within 5 seconds, to an endpoint.verification event. A 2xx without the echoed challenge does not verify the endpoint.
 */
export type WebhookVerificationResponse = {
  /**
   * Endpoint verification nonce: 32 random bytes, unpadded base64url (43 characters). Fresh per verification.
   */
  challenge: string;
};

/** @internal */
export const WebhookVerificationResponse$inboundSchema: z.ZodMiniType<
  WebhookVerificationResponse,
  unknown
> = z.object({
  challenge: types.string(),
});
/** @internal */
export type WebhookVerificationResponse$Outbound = {
  challenge: string;
};

/** @internal */
export const WebhookVerificationResponse$outboundSchema: z.ZodMiniType<
  WebhookVerificationResponse$Outbound,
  WebhookVerificationResponse
> = z.object({
  challenge: z.string(),
});

export function webhookVerificationResponseToJSON(
  webhookVerificationResponse: WebhookVerificationResponse,
): string {
  return JSON.stringify(
    WebhookVerificationResponse$outboundSchema.parse(
      webhookVerificationResponse,
    ),
  );
}
export function webhookVerificationResponseFromJSON(
  jsonString: string,
): SafeParseResult<WebhookVerificationResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookVerificationResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookVerificationResponse' from JSON`,
  );
}
