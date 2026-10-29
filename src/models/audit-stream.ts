import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Environment, Environment$inboundSchema } from "./environment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  WebhookEndpointState,
  WebhookEndpointState$inboundSchema,
} from "./webhook-endpoint-state.js";

export type AuditStream = {
  endpointId: string;
  environment: Environment;
  actions: Array<string>;
  createdAt: string;
  /**
   * unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.
   */
  endpointState: WebhookEndpointState;
  lastAttemptAt?: string | undefined;
  lastDeliveredAt?: string | undefined;
};

/** @internal */
export const AuditStream$inboundSchema: z.ZodMiniType<AuditStream, unknown> = z
  .pipe(
    z.object({
      endpoint_id: types.string(),
      environment: Environment$inboundSchema,
      actions: z.array(types.string()),
      created_at: types.string(),
      endpoint_state: WebhookEndpointState$inboundSchema,
      last_attempt_at: types.optional(types.string()),
      last_delivered_at: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "endpoint_id": "endpointId",
        "created_at": "createdAt",
        "endpoint_state": "endpointState",
        "last_attempt_at": "lastAttemptAt",
        "last_delivered_at": "lastDeliveredAt",
      });
    }),
  );

export function auditStreamFromJSON(
  jsonString: string,
): SafeParseResult<AuditStream, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AuditStream$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AuditStream' from JSON`,
  );
}
