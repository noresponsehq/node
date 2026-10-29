import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  RequestAggregateRequestBucket,
  RequestAggregateRequestBucket$outboundSchema,
} from "./request-aggregate-request-bucket.js";

/**
 * Count every retained matching attempt in [from,to). Capture is best effort; missing attempts cannot be inferred. UTC buckets may be partial at the edges. The window is at most 7 days.
 */
export type RequestAggregateRequest = {
  from: string;
  to: string;
  bucket?: RequestAggregateRequestBucket | undefined;
  status?: number | undefined;
  route?: string | undefined;
  apiKeyId?: string | undefined;
};

/** @internal */
export type RequestAggregateRequest$Outbound = {
  from: string;
  to: string;
  bucket?: string | undefined;
  status?: number | undefined;
  route?: string | undefined;
  api_key_id?: string | undefined;
};

/** @internal */
export const RequestAggregateRequest$outboundSchema: z.ZodMiniType<
  RequestAggregateRequest$Outbound,
  RequestAggregateRequest
> = z.pipe(
  z.object({
    from: z.string(),
    to: z.string(),
    bucket: z.optional(RequestAggregateRequestBucket$outboundSchema),
    status: z.optional(z.int()),
    route: z.optional(z.string()),
    apiKeyId: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      apiKeyId: "api_key_id",
    });
  }),
);

export function requestAggregateRequestToJSON(
  requestAggregateRequest: RequestAggregateRequest,
): string {
  return JSON.stringify(
    RequestAggregateRequest$outboundSchema.parse(requestAggregateRequest),
  );
}
