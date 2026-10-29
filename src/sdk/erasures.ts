import { erasuresGet } from "../funcs/erasures-get.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Erasures extends ClientSDK {
  /**
   * Read an erasure receipt
   *
   * @remarks
   * Read retained erasure progress and downstream acknowledgements. Completion does not certify deletion from backups.
   */
  async get(
    request: operations.GetErasureReceiptRequest,
    options?: RequestOptions,
  ): Promise<operations.GetErasureReceiptResponse> {
    return unwrapAsync(erasuresGet(
      this,
      request,
      options,
    ));
  }
}
