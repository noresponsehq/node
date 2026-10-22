import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  IntegrationHookPoint,
  IntegrationHookPoint$outboundSchema,
} from "./integration-hook-point.js";
import {
  IntegrationPlatform,
  IntegrationPlatform$outboundSchema,
} from "./integration-platform.js";

/**
 * POST /v1/integrations body. Registers a hosted endpoint for one authentication provider. The tenant is the API key that signs the request, so the body has no tenant field and refuses one like any other unknown member. A WorkOS integration needs signing_secret, the Actions secret shown in the WorkOS dashboard, which NoResponse uses to verify each Action request and to sign its answer. An Auth0 integration sends no signing_secret: NoResponse generates the shared secret and returns it once.
 */
export type IntegrationRequest = {
  /**
   * The authentication provider that calls the endpoint.
   */
  platform: IntegrationPlatform;
  /**
   * The provider events the endpoint scores. Default both: pre_registration (WorkOS user registration Action, Auth0 pre-user-registration trigger) and post_login (WorkOS authentication Action, Auth0 post-login trigger). An event that is not listed is answered allow without an assessment.
   */
  hookPoints?: Array<IntegrationHookPoint> | undefined;
  /**
   * The WorkOS Actions signing secret, as the WorkOS dashboard shows it: 16 to 256 printable ASCII characters with no spaces. It is stored sealed and is not returned.
   */
  signingSecret?: string | undefined;
};

/** @internal */
export type IntegrationRequest$Outbound = {
  platform: string;
  hook_points?: Array<string> | undefined;
  signing_secret?: string | undefined;
};

/** @internal */
export const IntegrationRequest$outboundSchema: z.ZodMiniType<
  IntegrationRequest$Outbound,
  IntegrationRequest
> = z.pipe(
  z.object({
    platform: IntegrationPlatform$outboundSchema,
    hookPoints: z.optional(z.array(IntegrationHookPoint$outboundSchema)),
    signingSecret: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      hookPoints: "hook_points",
      signingSecret: "signing_secret",
    });
  }),
);

export function integrationRequestToJSON(
  integrationRequest: IntegrationRequest,
): string {
  return JSON.stringify(
    IntegrationRequest$outboundSchema.parse(integrationRequest),
  );
}
