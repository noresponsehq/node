import { accountsAssociateCredential } from "../funcs/accounts-associate-credential.js";
import { accountsDelete } from "../funcs/accounts-delete.js";
import { accountsExport } from "../funcs/accounts-export.js";
import { accountsGet } from "../funcs/accounts-get.js";
import { accountsListAssessments } from "../funcs/accounts-list-assessments.js";
import { accountsListChanged } from "../funcs/accounts-list-changed.js";
import { accountsListCredentials } from "../funcs/accounts-list-credentials.js";
import { accountsListDecisions } from "../funcs/accounts-list-decisions.js";
import { accountsListEnforcements } from "../funcs/accounts-list-enforcements.js";
import { accountsListOutcomes } from "../funcs/accounts-list-outcomes.js";
import { accountsRecordEnforcement } from "../funcs/accounts-record-enforcement.js";
import { accountsRecordOutcome } from "../funcs/accounts-record-outcome.js";
import { accountsRetireCredential } from "../funcs/accounts-retire-credential.js";
import { accountsRetrieveDecision } from "../funcs/accounts-retrieve-decision.js";
import { accountsSearch } from "../funcs/accounts-search.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { PageIterator, unwrapResultIterator } from "../types/operations.js";

export class Accounts extends ClientSDK {
  /**
   * Poll the accounts whose risk changed.
   *
   * @remarks
   * Your accounts whose risk changed, oldest change first, each as accounts.get answers it. Every page carries next_cursor: pass it back as changed_since to read the changes made after that page; without changed_since the list starts from the oldest change. When nothing changed, items is empty and next_cursor is the cursor you sent, so poll by calling again with the latest next_cursor. An account appears again each time its risk changes, with a higher risk_version; keep the copy with the highest. unenforced=true lists only accounts with a decision other than allow for some flow and no applied enforcement at their current risk_version; such a page can hold fewer than limit items, or none, while later changes exist, so keep polling with next_cursor. Requires the history scope. Read-only and safe to retry. A tampered or foreign cursor answers 400 invalid_cursor.
   */
  async listChanged(
    request?: operations.ListAccountsRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListAccountsResponse> {
    return unwrapAsync(accountsListChanged(
      this,
      request,
      options,
    ));
  }

  /**
   * Read an account's one current risk.
   *
   * @remarks
   * An account is the account_id you send with your assessments. Its current risk is the risk of its latest assessment with a decision (status complete or partial), scored as GET /v1/assessments/{assessment_id} scores that assessment, with a decision for each flow; risk.decision is the decision for the flow of that assessment. Every assessment answers with this same account. Every assessment updates its account: once an assessment completes, the account carries its risk. Requires the history scope. Read-only and safe to retry. An account with no unexpired assessment that has a decision answers 404 not_found, and a malformed account_id answers 400 invalid_request.
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
   * Erase an account and its history.
   *
   * @remarks
   * Erases the account in the environment of your key, for an erasure request from your user: every assessment of it, with its revisions, evidence and outcomes, and the identity-graph marks its outcomes set. An assessment of the account begun before the call is refused or stopped. Afterwards the account and each erased assessment answer 404 and the history is empty. When the call deleted at least one assessment, an account.deleted event goes to your verified webhook endpoints. Requires the history scope. Idempotent and safe to retry: a repeat, or an account with nothing to erase, answers 200 with assessments_deleted 0 and sends no event. The account_id can be assessed again later, as a new account.
   */
  async delete(
    request: operations.DeleteAccountRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteAccountResponse> {
    return unwrapAsync(accountsDelete(
      this,
      request,
      options,
    ));
  }

  /**
   * Page through one account's unexpired assessments.
   *
   * @remarks
   * The account's history: the same page as POST /v1/assessments/query for this account_id, newest first, each at its latest assessment_version. Requires the history scope. Read-only and safe to retry. An account with no assessments answers 200 with empty items. The cursor is opaque and bound to your workspace and the account; a tampered or expired cursor answers 400 invalid_cursor. response_mode=detailed needs the detailed scope. Each item's identifiers holds the identifiers its assessment was sent, exactly as received. The account_id travels in the URL; use POST /v1/assessments/query to keep it out of access logs.
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

  /**
   * Record what you did to an account in your identity provider.
   *
   * @remarks
   * Records what you did to the account in your identity provider for one flow's decision at one risk_version: the action (or none), the account's state before it, the provider and whether it was applied or failed. It is your action, not an outcome, and it leaves the account's risk unchanged. A record is kept once per account, risk_version, flow and action: the first report answers 201, and a repeat answers 200 with the stored record unchanged, so retries are safe without an Idempotency-Key. An applied report after a failed one replaces the failed record, keeping its id and created_at, and answers 201. A risk_version older than the account's current one is accepted and stored, but only an applied record at the current risk_version takes the account out of listChanged with unenforced=true; a newer one answers 409 risk_version_ahead. An account with no current risk answers 404 not_found. error_code is allowed only with status failed. Requires the history scope.
   */
  async recordEnforcement(
    request: operations.RecordEnforcementRequest,
    options?: RequestOptions,
  ): Promise<operations.RecordEnforcementResponse> {
    return unwrapAsync(accountsRecordEnforcement(
      this,
      request,
      options,
    ));
  }

  /**
   * Page through account enforcements
   *
   * @remarks
   * List retained enforcement reports for one account with an authenticated cursor.
   */
  async listEnforcements(
    request: operations.ListAccountEnforcementsRequest,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.ListAccountEnforcementsResponse, { cursor: string }>
  > {
    return unwrapResultIterator(accountsListEnforcements(
      this,
      request,
      options,
    ));
  }

  /**
   * Record or correct an account outcome
   *
   * @remarks
   * Record a factual report, not an enforcement action. A known outcome replaces the effective report. unknown alone records uncertainty without changing it; unknown with supersedes explicitly retracts it. supersedes must name the current effective report or the request answers 409 outcome_conflict. Reports remain append-only. Idempotency-Key is required. observed_at defaults to receipt time and cannot be over five minutes ahead.
   */
  async recordOutcome(
    request: operations.RecordAccountOutcomeRequest,
    options?: RequestOptions,
  ): Promise<operations.RecordAccountOutcomeResponse> {
    return unwrapAsync(accountsRecordOutcome(
      this,
      request,
      options,
    ));
  }

  /**
   * List retained account feedback
   *
   * @remarks
   * List retained account reports, newest first. The page-level effective outcome id names the current report. Each receipt preserves the effective report and risk version from its original write. Page with the returned cursor.
   */
  async listOutcomes(
    request: operations.ListAccountOutcomesRequest,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.ListAccountOutcomesResponse, { cursor: string }>
  > {
    return unwrapResultIterator(accountsListOutcomes(
      this,
      request,
      options,
    ));
  }

  /**
   * Retrieve an exact historical account decision
   *
   * @remarks
   * Retrieve the account decision at one recorded risk version. The answer uses the original assessment and account-specific risk inputs. Earlier versions that were not captured return 404. The assessment version, policy version and account calculation version identify the decision.
   */
  async retrieveDecision(
    request: operations.GetAccountDecisionRequest,
    options?: RequestOptions,
  ): Promise<operations.GetAccountDecisionResponse> {
    return unwrapAsync(accountsRetrieveDecision(
      this,
      request,
      options,
    ));
  }

  /**
   * Associate a customer-issued API key
   *
   * @remarks
   * Associate the SHA-256 of a high-entropy key issued by your service. Send the hash instead of the key. Repeating a hash returns its original association, including its retirement state. A hash associated with another account returns a conflict.
   */
  async associateCredential(
    request: operations.AssociateCredentialRequest,
    options?: RequestOptions,
  ): Promise<operations.AssociateCredentialResponse> {
    return unwrapAsync(accountsAssociateCredential(
      this,
      request,
      options,
    ));
  }

  /**
   * List issued credential associations
   *
   * @remarks
   * Retained credential associations, ordered by id. Page with the authenticated cursor. Associations are removed on account erasure.
   */
  async listCredentials(
    request: operations.ListAccountCredentialsRequest,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.ListAccountCredentialsResponse, { cursor: string }>
  > {
    return unwrapResultIterator(accountsListCredentials(
      this,
      request,
      options,
    ));
  }

  /**
   * Retire an issued credential association
   *
   * @remarks
   * Mark this association retired, idempotently. This does not revoke the actual key. Requires delete scope.
   */
  async retireCredential(
    request: operations.RetireAccountCredentialRequest,
    options?: RequestOptions,
  ): Promise<operations.RetireAccountCredentialResponse> {
    return unwrapAsync(accountsRetireCredential(
      this,
      request,
      options,
    ));
  }

  /**
   * Export an account
   *
   * @remarks
   * Retrieve one consistent snapshot of retained customer-accessible records, including assessment revisions, account decisions, feedback, key associations, enforcements and request diagnostics. Each assessment revision's detail.identifiers holds the identifiers that assessment was sent, exactly as received. Secrets, restricted source information, other customers' data and legacy free-text notes are excluded. The same standard/detailed permissions apply. An export exceeding 10000 records or 8 MiB returns export_too_large without a partial result. Historical decisions that were not captured are identified as an exclusion.
   */
  async export(
    request: operations.ExportAccountRequest,
    options?: RequestOptions,
  ): Promise<operations.ExportAccountResponse> {
    return unwrapAsync(accountsExport(
      this,
      request,
      options,
    ));
  }

  /**
   * Page through recorded account decisions
   *
   * @remarks
   * List retained immutable risk decisions for one account with an authenticated cursor.
   */
  async listDecisions(
    request: operations.ListAccountDecisionsRequest,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.ListAccountDecisionsResponse, { cursor: string }>
  > {
    return unwrapResultIterator(accountsListDecisions(
      this,
      request,
      options,
    ));
  }

  /**
   * Search distinct accounts by email or account ID
   *
   * @remarks
   * Search distinct accounts observed in retained assessments in this environment. Match an exact account_id or canonical email; an email matches any retained assessment belonging to the account. The response contains one row per account with its newest retained assessment, current decision when available, per-account assessment count, and total distinct-account count. Send next_cursor with unchanged filters to continue. Totals are exact below 10000 and capped at 10000. Results are live across pages. Requires history access and identifier access for email. Read-only and safe to retry.
   */
  async search(
    request: models.AccountDirectorySearchRequest,
    options?: RequestOptions,
  ): Promise<operations.SearchAccountsResponse> {
    return unwrapAsync(accountsSearch(
      this,
      request,
      options,
    ));
  }
}
