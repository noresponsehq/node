import { requestsAggregate } from "../funcs/requests-aggregate.js";
import { requestsList } from "../funcs/requests-list.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { PageIterator, unwrapResultIterator } from "../types/operations.js";

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
  ): Promise<
    PageIterator<operations.ListRequestDiagnosticsResponse, { cursor: string }>
  > {
    return unwrapResultIterator(requestsList(
      this,
      request,
      options,
    ));
  }

  /**
   * Summarise retained request attempts
   *
   * @remarks
   * Count all retained matching request attempts and latency samples within seven days. Capture is best effort.
   */
  async aggregate(
    request: models.RequestAggregateRequest,
    options?: RequestOptions,
  ): Promise<operations.AggregateRequestsResponse> {
    return unwrapAsync(requestsAggregate(
      this,
      request,
      options,
    ));
  }
}
