import { accountsGet } from "../funcs/accounts-get.js";
import { accountsListAssessments } from "../funcs/accounts-list-assessments.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { PageIterator, unwrapResultIterator } from "../types/operations.js";

export class Accounts extends ClientSDK {
  /**
   * Read an account's one current risk.
   *
   * @remarks
   * An account is the account_id you send with your assessments. Its current risk is the risk of its latest assessment with a decision (status complete or partial), scored as GET /v1/assessments/{assessment_id} scores that assessment, with a decision for each flow. Every assessment updates its account: once an assessment completes, the account carries its risk. Requires the history scope. Read-only and safe to retry. An account with no unexpired assessment that has a decision answers 404 not_found, and a malformed account_id answers 400 invalid_request.
   */
  async get(
    request: operations.GetAccountRequest,
    options?: RequestOptions,
  ): Promise<operations.GetAccountResponse> {
    return unwrapAsync(accountsGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Page through one account's unexpired assessments.
   *
   * @remarks
   * The account's history: the same page as POST /v1/assessments/query for this account_id, newest first, each at its latest assessment_version. Requires the history scope. Read-only and safe to retry. An account with no assessments answers 200 with empty items. The cursor is opaque and bound to your tenant and the account; a tampered or expired cursor answers 400 invalid_cursor. response_mode=detailed needs the detailed scope. The account_id travels in the URL; use POST /v1/assessments/query to keep it out of access logs.
   */
  async listAssessments(
    request: operations.ListAccountAssessmentsRequest,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.ListAccountAssessmentsResponse, { cursor: string }>
  > {
    return unwrapResultIterator(accountsListAssessments(
      this,
      request,
      options,
    ));
  }
}
