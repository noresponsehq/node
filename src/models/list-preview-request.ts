import * as z from "zod/v4-mini";
import {
  ListEntryRequest,
  ListEntryRequest$Outbound,
  ListEntryRequest$outboundSchema,
} from "./list-entry-request.js";

/**
 * Choose an addition or a removal. The preview performs no list, account, audit, outcome or outbox write.
 */
export type ListPreviewRequest = {
  /**
   * POST /v1/workspaces/{workspace_id}/lists/{environment} body. Adds one entry to the environment's list and, in the same change, re-decides every account it matches: each sends account.risk_changed when a decision changes. Needs the admin or owner role, or a management key of the environment.
   */
  add?: ListEntryRequest | undefined;
  remove?: string | undefined;
};

/** @internal */
export type ListPreviewRequest$Outbound = {
  add?: ListEntryRequest$Outbound | undefined;
  remove?: string | undefined;
};

/** @internal */
export const ListPreviewRequest$outboundSchema: z.ZodMiniType<
  ListPreviewRequest$Outbound,
  ListPreviewRequest
> = z.object({
  add: z.optional(ListEntryRequest$outboundSchema),
  remove: z.optional(z.string()),
});

export function listPreviewRequestToJSON(
  listPreviewRequest: ListPreviewRequest,
): string {
  return JSON.stringify(
    ListPreviewRequest$outboundSchema.parse(listPreviewRequest),
  );
}
