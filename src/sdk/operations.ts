import { operationsSummarize } from "../funcs/operations-summarize.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Operations extends ClientSDK {
  /**
   * Summarize retained account outcomes, enforcement reports and reviews.
   *
   * @remarks
   * Read one retained snapshot of account outcomes, enforcement reports and review states for the environment and a window of at most 31 days. Each section declares its own population, numerator, denominator and label coverage. Current outcome heads preserve explicit unknown labels. Enforcement rows are reports from your application and do not independently verify execution. Requires history or investigate together with management scope. A result exceeding 100000 population rows or the query budget is refused without truncation.
   */
  async summarize(
    request: operations.SummarizeWorkspaceOperationsRequest,
    options?: RequestOptions,
  ): Promise<operations.SummarizeWorkspaceOperationsResponse> {
    return unwrapAsync(operationsSummarize(
      this,
      request,
      options,
    ));
  }
}
