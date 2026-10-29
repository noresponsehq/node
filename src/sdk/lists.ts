import { listsChange } from "../funcs/lists-change.js";
import { listsCreate } from "../funcs/lists-create.js";
import { listsDelete } from "../funcs/lists-delete.js";
import { listsGetChange } from "../funcs/lists-get-change.js";
import { listsList } from "../funcs/lists-list.js";
import { listsPreview } from "../funcs/lists-preview.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { PageIterator, unwrapResultIterator } from "../types/operations.js";

export class Lists extends ClientSDK {
  /**
   * List an environment's list entries.
   *
   * @remarks
   * Page through this environment allow and block entries, with canonical values, reasons and optional expiry. Requires settings or management. Follow the returned cursor until exhausted; a page is not the complete list. The cursor is bound to the environment and current filters.
   */
  async list(
    request: operations.ListListEntriesRequest,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.ListListEntriesResponse, { cursor: string }>
  > {
    return unwrapResultIterator(listsList(
      this,
      request,
      options,
    ));
  }

  /**
   * Add an entry to an environment's list.
   *
   * @remarks
   * Add a canonical email or email-domain override with a reason and optional expiry. Requires settings plus policy_publish, or legacy management. Block wins over allow when both match. A small single-entry change retains the documented synchronous match budget; use lists.change for larger changes, whose account propagation is durable and resumable.
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
   * Remove an override with settings plus policy_publish, or legacy management. The removal takes effect for new decisions and schedules resumable propagation across matching retained accounts. An unknown or already removed entry answers404. Account risk events announce changed decisions as propagation runs.
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

  /**
   * Preview a list override change without side effects.
   *
   * @remarks
   * Preview canonical list matches and current override effects with settings or management. The result states its bounded coverage and changes no list entries.
   */
  async preview(
    request: operations.PreviewListRequest,
    options?: RequestOptions,
  ): Promise<operations.PreviewListResponse> {
    return unwrapAsync(listsPreview(
      this,
      request,
      options,
    ));
  }

  /**
   * Apply an idempotent atomic bulk list change.
   *
   * @remarks
   * Atomically add and remove a bounded batch of entries with an idempotency key. Requires settings plus policy_publish, or legacy management. The receipt exposes durable account propagation beyond the synchronous single-entry budget; poll lists.getChange until completion.
   */
  async change(
    request: operations.ChangeListsRequest,
    options?: RequestOptions,
  ): Promise<operations.ChangeListsResponse> {
    return unwrapAsync(listsChange(
      this,
      request,
      options,
    ));
  }

  /**
   * Read a bulk list change and propagation progress.
   *
   * @remarks
   * Read retained propagation progress for a list change with settings or management.
   */
  async getChange(
    request: operations.GetListChangeRequest,
    options?: RequestOptions,
  ): Promise<operations.GetListChangeResponse> {
    return unwrapAsync(listsGetChange(
      this,
      request,
      options,
    ));
  }
}
