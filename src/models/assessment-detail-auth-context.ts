import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { HookPoint, HookPoint$inboundSchema } from "./hook-point.js";
import { Transport, Transport$inboundSchema } from "./transport.js";

/**
 * The identity fields of the auth context the assessment was made with, echoed for the workspace's own correlation: the request's auth_context, or the one a hosted provider hook (POST /hooks/{integration_id}) built, with transport provider_hook and its hook_point. Present exactly when the request carried an auth_context, and the same on every revision of the assessment. Values are as the request or the hook sent them; tokens, timestamps, roles and scopes are not echoed, and the echo does not change the score.
 */
export type AssessmentDetailAuthContext = {
  /**
   * The provider slug the context named.
   */
  provider: string;
  /**
   * The issuer the context named.
   */
  issuer: string;
  /**
   * The subject the context named; absent when it named none (a pre_registration hook).
   */
  subject?: string | undefined;
  /**
   * The session identifier the context named, when it named one.
   */
  sessionId?: string | undefined;
  /**
   * The organization identifier the context named, when it named one.
   */
  organizationId?: string | undefined;
  /**
   * The verified flag the context carried. A provider_hook context is always false.
   */
  verified: boolean;
  /**
   * Where the context was derived: backend (also when the request named no transport), browser, or provider_hook for a hosted provider hook.
   */
  transport: Transport;
  /**
   * The provider event a provider_hook context was sent for; absent for any other transport.
   */
  hookPoint?: HookPoint | undefined;
};

/** @internal */
export const AssessmentDetailAuthContext$inboundSchema: z.ZodMiniType<
  AssessmentDetailAuthContext,
  unknown
> = z.pipe(
  z.object({
    provider: types.string(),
    issuer: types.string(),
    subject: types.optional(types.string()),
    session_id: types.optional(types.string()),
    organization_id: types.optional(types.string()),
    verified: types.boolean(),
    transport: Transport$inboundSchema,
    hook_point: types.optional(HookPoint$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "session_id": "sessionId",
      "organization_id": "organizationId",
      "hook_point": "hookPoint",
    });
  }),
);

export function assessmentDetailAuthContextFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentDetailAuthContext, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentDetailAuthContext$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentDetailAuthContext' from JSON`,
  );
}
