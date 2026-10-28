import { requestsList } from "../funcs/requests-list.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Requests extends ClientSDK {
  /**
   * Search request diagnostics
   *
   * @remarks
   * Search authenticated request attempts by time, route, status or request correlation id. The interval is at most seven days. Each attempt has a unique id and may include the exact served decision. Records are bounded best effort and exclude request bodies, secrets and source payloads. A repeated correlation id does not overwrite another attempt.
   */
  async list(
    request: operations.ListRequestDiagnosticsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListRequestDiagnosticsResponse> {
    return unwrapAsync(requestsList(
      this,
      request,
      options,
    ));
  }
}
