import { usageGet } from "../funcs/usage-get.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Usage extends ClientSDK {
  /**
   * Read a workspace's usage.
   *
   * @remarks
   * Read daily usage units for the environments you can access. These counts are unpriced.
   */
  async get(
    request: operations.GetUsageRequest,
    options?: RequestOptions,
  ): Promise<operations.GetUsageResponse> {
    return unwrapAsync(usageGet(
      this,
      request,
      options,
    ));
  }
}
