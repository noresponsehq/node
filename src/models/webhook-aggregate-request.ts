import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  RequestAggregateRequestBucket,
  RequestAggregateRequestBucket$outboundSchema,
} from "./request-aggregate-request-bucket.js";

/**
 * Count every retained matching attempt in [from,to). Capture is best effort; missing attempts cannot be inferred. UTC buckets may be partial at the edges. The window is at most 30 days.
 */
export type WebhookAggregateRequest = {
  from: string;
  to: string;
  bucket?: RequestAggregateRequestBucket | undefined;
  status?: number | undefined;
  /**
   * Opaque id of the endpoint registration.
   */
  endpointId?: string | undefined;
};

/** @internal */
export type WebhookAggregateRequest$Outbound = {
  from: string;
  to: string;
  bucket?: string | undefined;
  status?: number | undefined;
  endpoint_id?: string | undefined;
};

/** @internal */
export const WebhookAggregateRequest$outboundSchema: z.ZodMiniType<
  WebhookAggregateRequest$Outbound,
  WebhookAggregateRequest
> = z.pipe(
  z.object({
    from: z.string(),
    to: z.string(),
    bucket: z.optional(RequestAggregateRequestBucket$outboundSchema),
    status: z.optional(z.int()),
    endpointId: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      endpointId: "endpoint_id",
    });
  }),
);

export function webhookAggregateRequestToJSON(
  webhookAggregateRequest: WebhookAggregateRequest,
): string {
  return JSON.stringify(
    WebhookAggregateRequest$outboundSchema.parse(webhookAggregateRequest),
  );
}
