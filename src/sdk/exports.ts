import { exportsCancel } from "../funcs/exports-cancel.js";
import { exportsCreate } from "../funcs/exports-create.js";
import { exportsDownloadChunk } from "../funcs/exports-download-chunk.js";
import { exportsGet } from "../funcs/exports-get.js";
import { exportsList } from "../funcs/exports-list.js";
import { exportsRetry } from "../funcs/exports-retry.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { PageIterator, unwrapResultIterator } from "../types/operations.js";

export class Exports extends ClientSDK {
  /**
   * Request an asynchronous customer export.
   *
   * @remarks
   * Request an encrypted JSON Lines snapshot of retained account or audit records. Requires exports plus history or audit scope; detailed account data also needs evidence or detailed scope. Criteria are frozen and hashed. Each environment permits four active jobs, 64 MiB per artifact, and 256 KiB per chunk. Artifacts expire after 24 hours. Send an Idempotency-Key to safely repeat a request. Every operation checks current permissions and source retention.
   */
  async create(
    request: operations.CreateCustomerExportRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateCustomerExportResponse> {
    return unwrapAsync(exportsCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * List exports for one collection.
   *
   * @remarks
   * List authorised jobs for one kind and environment. Detailed jobs require current detailed-data permission and are filtered before pagination. Keep the kind and environment unchanged when following next_cursor.
   */
  async list(
    request: operations.ListCustomerExportsRequest,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.ListCustomerExportsResponse, { cursor: string }>
  > {
    return unwrapResultIterator(exportsList(
      this,
      request,
      options,
    ));
  }

  /**
   * Read export state and progress.
   *
   * @remarks
   * Read the status of an authorised export. Records and bytes describe committed progress in the current generation. Only completed, unexpired artifacts can be downloaded. Source erasure, retention changes and workspace removal can invalidate a job.
   */
  async get(
    request: operations.GetCustomerExportRequest,
    options?: RequestOptions,
  ): Promise<operations.GetCustomerExportResponse> {
    return unwrapAsync(exportsGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Cancel and remove an export artifact.
   *
   * @remarks
   * Cancel an export and remove its stored chunks. Repeating cancellation is safe. An already admitted download may finish; bytes already returned cannot be recalled. Send an empty JSON object.
   */
  async cancel(
    request: operations.CancelCustomerExportRequest,
    options?: RequestOptions,
  ): Promise<operations.CancelCustomerExportResponse> {
    return unwrapAsync(exportsCancel(
      this,
      request,
      options,
    ));
  }

  /**
   * Retry a failed export.
   *
   * @remarks
   * Start a new generation of a failed export before its original expiry, up to ten generations. The request criteria stay fixed and the new generation takes a fresh source snapshot. Cancelled, erased and expired jobs cannot be retried. Send an empty JSON object.
   */
  async retry(
    request: operations.RetryCustomerExportRequest,
    options?: RequestOptions,
  ): Promise<operations.RetryCustomerExportResponse> {
    return unwrapAsync(exportsRetry(
      this,
      request,
      options,
    ));
  }

  /**
   * Download one authorized export chunk.
   *
   * @remarks
   * Download one chunk of a completed, unexpired export after a fresh permission and privacy check. The response contains base64-encoded JSON Lines, a SHA-256, generation and next index. Decode and concatenate chunks in order from one generation. Audit storage failure withholds the bytes.
   */
  async downloadChunk(
    request: operations.DownloadCustomerExportChunkRequest,
    options?: RequestOptions,
  ): Promise<operations.DownloadCustomerExportChunkResponse> {
    return unwrapAsync(exportsDownloadChunk(
      this,
      request,
      options,
    ));
  }
}
