import { listsCreate } from "../funcs/lists-create.js";
import { listsDelete } from "../funcs/lists-delete.js";
import { listsList } from "../funcs/lists-list.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Lists extends ClientSDK {
  /**
   * List an environment's list entries.
   *
   * @remarks
   * Lists every entry of the signing key's environment's list, newest first: each an email or an email domain that decides the accounts it matches, block or allow, whatever their score. Requires the management scope; the other environment answers 404 not_found. Read-only and safe to retry.
   */
  async list(
    request: operations.ListListEntriesRequest,
    options?: RequestOptions,
  ): Promise<operations.ListListEntriesResponse> {
    return unwrapAsync(listsList(
      this,
      request,
      options,
    ));
  }

  /**
   * Add an entry to an environment's list.
   *
   * @remarks
   * Adds an exact email (kind email) or an email domain (kind email_domain) to the signing key's environment's list with the action block or allow, and answers the entry with its value in canonical form. An account matches when one of its assessments sent the email, or an email of the domain: a block entry decides block for every flow and an allow entry allow, block winning when both match, and the account's risk carries list_match with the entry's id while its score is unchanged. Every matching account is re-decided at once and sends account.risk_changed when its decision changes. A value already on the list answers 409 list_entry_exists, a full list 409 list_limit_reached, and an entry matching more than 5,000 accounts 409 list_entry_too_broad. Requires the management scope; the other environment answers 404 not_found.
   */
  async create(
    request: operations.CreateListEntryRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateListEntryResponse> {
    return unwrapAsync(listsCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * Remove an entry from an environment's list.
   *
   * @remarks
   * Removes an entry from the signing key's environment's list and re-decides the accounts it matched, the 5,000 most recently assessed at most, each sending account.risk_changed when its decision changes. An unknown or already removed entry answers 404 not_found. Requires the management scope.
   */
  async delete(
    request: operations.DeleteListEntryRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteListEntryResponse | undefined> {
    return unwrapAsync(listsDelete(
      this,
      request,
      options,
    ));
  }
}
