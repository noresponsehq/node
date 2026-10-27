import * as z from "zod/v4-mini";
import {
  ListEntryAction,
  ListEntryAction$outboundSchema,
} from "./list-entry-action.js";
import {
  ListEntryKind,
  ListEntryKind$outboundSchema,
} from "./list-entry-kind.js";

/**
 * POST /v1/workspaces/{workspace_id}/lists/{environment} body. Adds one entry to the environment's list and, in the same change, re-decides every account it matches: each sends account.risk_changed when a decision changes. Needs the admin or owner role, or a management key of the environment.
 */
export type ListEntryRequest = {
  /**
   * email matches one address, whatever the case of its local part. email_domain matches every address of the registrable domain and of its subdomains.
   */
  kind: ListEntryKind;
  /**
   * An email address for kind email, written as in an assessment request; an LDH domain (A-label for an internationalised one) such as example.com for kind email_domain, which must sit below a public suffix (co.uk alone is refused with 400). NoResponse stores it in canonical form and answers that form.
   */
  value: string;
  /**
   * block decides block for the accounts the entry matches; allow decides allow. Block wins when both match.
   */
  action: ListEntryAction;
  /**
   * Why the entry exists, for the people who manage the list. It is shown with the entry and decides nothing.
   */
  note?: string | undefined;
};

/** @internal */
export type ListEntryRequest$Outbound = {
  kind: string;
  value: string;
  action: string;
  note?: string | undefined;
};

/** @internal */
export const ListEntryRequest$outboundSchema: z.ZodMiniType<
  ListEntryRequest$Outbound,
  ListEntryRequest
> = z.object({
  kind: ListEntryKind$outboundSchema,
  value: z.string(),
  action: ListEntryAction$outboundSchema,
  note: z.optional(z.string()),
});

export function listEntryRequestToJSON(
  listEntryRequest: ListEntryRequest,
): string {
  return JSON.stringify(
    ListEntryRequest$outboundSchema.parse(listEntryRequest),
  );
}
