import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.
 */
export const WebhookEndpointState = {
  Unverified: "unverified",
  Verified: "verified",
  Disabled: "disabled",
} as const;
/**
 * unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.
 */
export type WebhookEndpointState = OpenEnum<typeof WebhookEndpointState>;

/** @internal */
export const WebhookEndpointState$inboundSchema: z.ZodMiniType<
  WebhookEndpointState,
  unknown
> = openEnums.inboundSchema(WebhookEndpointState);
