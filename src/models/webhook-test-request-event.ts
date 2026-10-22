import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * endpoint.verification sends a fresh challenge now, in this call, and the endpoint is verified if it echoes it. assessment.updated queues an event whose data is a fixed example assessment, with test true, delivered and retried like any other; the endpoint must be verified.
 */
export const WebhookTestRequestEvent = {
  EndpointVerification: "endpoint.verification",
  AssessmentUpdated: "assessment.updated",
} as const;
/**
 * endpoint.verification sends a fresh challenge now, in this call, and the endpoint is verified if it echoes it. assessment.updated queues an event whose data is a fixed example assessment, with test true, delivered and retried like any other; the endpoint must be verified.
 */
export type WebhookTestRequestEvent = OpenEnum<typeof WebhookTestRequestEvent>;

/** @internal */
export const WebhookTestRequestEvent$inboundSchema: z.ZodMiniType<
  WebhookTestRequestEvent,
  unknown
> = openEnums.inboundSchema(WebhookTestRequestEvent);
/** @internal */
export const WebhookTestRequestEvent$outboundSchema: z.ZodMiniType<
  string,
  WebhookTestRequestEvent
> = openEnums.outboundSchema(WebhookTestRequestEvent);
