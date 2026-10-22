import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { ResponseMode, ResponseMode$inboundSchema } from "./response-mode.js";
import { SigningKey, SigningKey$inboundSchema } from "./signing-key.js";
import {
  WebhookEndpointState,
  WebhookEndpointState$inboundSchema,
} from "./webhook-endpoint-state.js";

/**
 * One of the tenant's registered webhook endpoints. Signing secrets are not part of it: a secret is shown once, when it is issued (POST /v1/webhooks and POST /v1/webhooks/{endpoint_id}/rotate).
 */
export type WebhookEndpoint = {
  /**
   * Opaque id of the endpoint registration.
   */
  endpointId: string;
  /**
   * The destination URL, as registered.
   */
  url: string;
  /**
   * unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.
   */
  state: WebhookEndpointState;
  /**
   * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
   */
  responseMode: ResponseMode;
  createdAt: string;
  /**
   * When the endpoint last echoed a challenge. Absent until it first does.
   */
  verifiedAt?: string | undefined;
  /**
   * The keys a receiver may see in NR-Webhook-Key-Id, oldest first. The last one signs every new delivery; an older one keeps verifying until its expires_at.
   */
  signingKeys: Array<SigningKey>;
};

/** @internal */
export const WebhookEndpoint$inboundSchema: z.ZodMiniType<
  WebhookEndpoint,
  unknown
> = z.pipe(
  z.object({
    endpoint_id: types.string(),
    url: types.string(),
    state: WebhookEndpointState$inboundSchema,
    response_mode: ResponseMode$inboundSchema,
    created_at: types.string(),
    verified_at: types.optional(types.string()),
    signing_keys: z.array(SigningKey$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "endpoint_id": "endpointId",
      "response_mode": "responseMode",
      "created_at": "createdAt",
      "verified_at": "verifiedAt",
      "signing_keys": "signingKeys",
    });
  }),
);

export function webhookEndpointFromJSON(
  jsonString: string,
): SafeParseResult<WebhookEndpoint, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookEndpoint$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookEndpoint' from JSON`,
  );
}
