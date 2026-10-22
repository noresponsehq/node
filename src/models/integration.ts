import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  IntegrationHookPoint,
  IntegrationHookPoint$inboundSchema,
} from "./integration-hook-point.js";
import {
  IntegrationPlatform,
  IntegrationPlatform$inboundSchema,
} from "./integration-platform.js";

/**
 * A hosted provider integration. Point the provider at url: a WorkOS user registration or authentication Action, or the NoResponse Auth0 Action, which sends secret as a bearer token. The answer allows or denies the event: deny only when the assessment's risk.block is true, and allow on every failure, so a fault on the NoResponse side lets the user through. secret is present only in the answers of POST /v1/integrations and POST /v1/integrations/{integration_id}/rotate for an Auth0 integration, and is not returned again.
 */
export type Integration = {
  /**
   * Opaque, server-assigned integration id: int_ and a 26-character Crockford base32 ULID. Another tenant's integration id answers 404.
   */
  integrationId: string;
  /**
   * The authentication provider that calls the endpoint.
   */
  platform: IntegrationPlatform;
  /**
   * Each hook point at most once.
   */
  hookPoints: Array<IntegrationHookPoint>;
  /**
   * The hosted endpoint, https://api.noresponse.org/hooks/{integration_id} in production.
   */
  url: string;
  /**
   * Auth0 only, and only when it is created or rotated: the shared secret the Auth0 Action sends as Authorization: Bearer <secret>. nri_ and 43 unpadded base64url characters (32 random bytes). Store it as an Auth0 Action secret.
   */
  secret?: string | undefined;
  createdAt: string;
  /**
   * When the secret was last rotated; absent until the first rotation.
   */
  rotatedAt?: string | undefined;
  /**
   * After a rotation, when the replaced secret stops being accepted; absent when no replaced secret is still accepted.
   */
  previousSecretExpiresAt?: string | undefined;
};

/** @internal */
export const Integration$inboundSchema: z.ZodMiniType<Integration, unknown> = z
  .pipe(
    z.object({
      integration_id: types.string(),
      platform: IntegrationPlatform$inboundSchema,
      hook_points: z.array(IntegrationHookPoint$inboundSchema),
      url: types.string(),
      secret: types.optional(types.string()),
      created_at: types.string(),
      rotated_at: types.optional(types.string()),
      previous_secret_expires_at: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "integration_id": "integrationId",
        "hook_points": "hookPoints",
        "created_at": "createdAt",
        "rotated_at": "rotatedAt",
        "previous_secret_expires_at": "previousSecretExpiresAt",
      });
    }),
  );

export function integrationFromJSON(
  jsonString: string,
): SafeParseResult<Integration, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Integration$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Integration' from JSON`,
  );
}
