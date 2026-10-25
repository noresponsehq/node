import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

/**
 * POST /v1/integrations/{integration_id}/rotate body. For an Auth0 integration send {}: NoResponse generates a new shared secret and returns it once. For a WorkOS or Supabase integration send the new signing_secret after regenerating it in the provider's dashboard. Either way the previous secret is still accepted for 24 hours, so the provider can be switched over without a refused call.
 */
export type IntegrationRotationRequest = {
  /**
   * The WorkOS Actions signing secret or the Supabase hook secret, as the provider's dashboard shows it: 16 to 256 printable ASCII characters with no spaces. It is stored sealed and is not returned.
   */
  signingSecret?: string | undefined;
};

/** @internal */
export type IntegrationRotationRequest$Outbound = {
  signing_secret?: string | undefined;
};

/** @internal */
export const IntegrationRotationRequest$outboundSchema: z.ZodMiniType<
  IntegrationRotationRequest$Outbound,
  IntegrationRotationRequest
> = z.pipe(
  z.object({
    signingSecret: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      signingSecret: "signing_secret",
    });
  }),
);

export function integrationRotationRequestToJSON(
  integrationRotationRequest: IntegrationRotationRequest,
): string {
  return JSON.stringify(
    IntegrationRotationRequest$outboundSchema.parse(integrationRotationRequest),
  );
}
