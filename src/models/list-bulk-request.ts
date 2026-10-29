import * as z from "zod/v4-mini";
import {
  ListEntryRequest,
  ListEntryRequest$Outbound,
  ListEntryRequest$outboundSchema,
} from "./list-entry-request.js";

/**
 * At most 100 additions and removals combined. One transaction applies all changes or none. Idempotency-Key prevents duplicate changes for 24 hours; a different body under the same key returns 409. Matching reads see the new list immediately, while bounded durable jobs propagate account risk notifications.
 */
export type ListBulkRequest = {
  add?: Array<ListEntryRequest> | undefined;
  remove?: Array<string> | undefined;
};

/** @internal */
export type ListBulkRequest$Outbound = {
  add?: Array<ListEntryRequest$Outbound> | undefined;
  remove?: Array<string> | undefined;
};

/** @internal */
export const ListBulkRequest$outboundSchema: z.ZodMiniType<
  ListBulkRequest$Outbound,
  ListBulkRequest
> = z.object({
  add: z.optional(z.array(ListEntryRequest$outboundSchema)),
  remove: z.optional(z.array(z.string())),
});

export function listBulkRequestToJSON(
  listBulkRequest: ListBulkRequest,
): string {
  return JSON.stringify(ListBulkRequest$outboundSchema.parse(listBulkRequest));
}
