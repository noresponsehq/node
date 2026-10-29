import { assessmentsAggregate } from "../funcs/assessments-aggregate.js";
import { assessmentsBindAccount } from "../funcs/assessments-bind-account.js";
import { assessmentsCreate } from "../funcs/assessments-create.js";
import { assessmentsDelete } from "../funcs/assessments-delete.js";
import { assessmentsGet } from "../funcs/assessments-get.js";
import { assessmentsQuery } from "../funcs/assessments-query.js";
import { assessmentsRecordOutcome } from "../funcs/assessments-record-outcome.js";
import { assessmentsRetrieveVersion } from "../funcs/assessments-retrieve-version.js";
import { assessmentsSearch } from "../funcs/assessments-search.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { PageIterator, unwrapResultIterator } from "../types/operations.js";

export class Assessments extends ClientSDK {
  /**
   * Assess identifiers for a signup or gateway decision.
   *
   * @remarks
   * Assesses one account creation, login or purchase (flow) and answers with the account's one current risk: account.risk.decision is the decision for this flow (allow, step_up, review or block, where block means your block threshold was reached), and detail holds this assessment's own facts. depth sets how long the answer waits for sources: quick waits only for the fast ones (500 ms), full for the whole budget (3000 ms at most); it defaults to full for account_creation and purchase and quick for login. 200 carries complete or partial, 202 carries pending with Location and Retry-After. While the account's first assessment is pending, account is absent: apply your own fallback for that, 429, 503 or a timeout. NoResponse blocks nothing itself; you decide. Requires the assess scope. Idempotency-Key is required and is bound to the body for 24 hours: the same key with the same body replays the latest assessment with Idempotent-Replayed: true and starts no new work; the same key with a different body answers 409 idempotency_key_reused. response_mode defaults to standard; detailed needs the detailed scope. The answer leaves out detail.identifiers: you hold what you sent, and a key with the history scope gets them back with GET.
   */
  async create(
    request: operations.CreateAssessmentRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateAssessmentResponse> {
    return unwrapAsync(assessmentsCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * Poll the authoritative assessment of one assessment.
   *
   * @remarks
   * Returns the highest assessment_version, with the account's current risk. Requires the assess or history scope. While status is pending, or partial with a source still running, the response carries Retry-After; poll no faster than it says. Another workspace's assessment, an unknown or expired assessment and a malformed assessment_id all answer 404 not_found. response_mode=detailed needs the detailed scope. A key with the history scope also gets detail.identifiers, the identifiers the assessment was sent, exactly as received.
   */
  async get(
    request: operations.GetAssessmentRequest,
    options?: RequestOptions,
  ): Promise<operations.GetAssessmentResponse> {
    return unwrapAsync(assessmentsGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Delete one assessment.
   *
   * @remarks
   * Deletes one assessment in the environment of your key, with its versions, evidence and outcomes and the identity-graph marks its outcomes set, and scores its account again from what remains. Afterwards the assessment answers 404 and leaves the account's history. The answer names the account and the assessment its current risk now comes from; current_assessment_id is absent when the account has no assessment with a decision left. Requires the history scope. An unknown, expired or already deleted assessment answers 404, so a repeat answers 404; to erase a whole account idempotently, use accounts.delete.
   */
  async delete(
    request: operations.DeleteAssessmentRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteAssessmentResponse> {
    return unwrapAsync(assessmentsDelete(
      this,
      request,
      options,
    ));
  }

  /**
   * Report what was later learned about an assessed account.
   *
   * @remarks
   * Records what you later learned about an assessed account: confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw your earlier report; unknown is recorded only. Outcomes are append-only and the latest one wins. Requires the assess scope. Idempotency-Key is required and handled as on POST /v1/assessments: a retry with the same key and body answers the same record with Idempotent-Replayed: true; a different body answers 409. An unknown, expired or foreign assessment answers 404 not_found.
   */
  async recordOutcome(
    request: operations.RecordAssessmentOutcomeRequest,
    options?: RequestOptions,
  ): Promise<operations.RecordAssessmentOutcomeResponse> {
    return unwrapAsync(assessmentsRecordOutcome(
      this,
      request,
      options,
    ));
  }

  /**
   * Page through one account's unexpired assessments.
   *
   * @remarks
   * History is a POST with account_id in the body so an account identifier stays out of URLs and access logs. Requires the history scope. Read-only and safe to retry. Newest first, each at its latest assessment_version. An account with no assessments answers 200 with empty items. The cursor is opaque and bound to your workspace and the account; a tampered or expired cursor answers 400 invalid_cursor. response_mode=detailed needs the detailed scope. Each item's identifiers holds the identifiers its assessment was sent, exactly as received.
   */
  async query(
    request: models.AssessmentQuery,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.QueryAccountAssessmentsResponse, { cursor: string }>
  > {
    return unwrapResultIterator(assessmentsQuery(
      this,
      request,
      options,
    ));
  }

  /**
   * Count assessments by time, decision and reason
   *
   * @remarks
   * Count this environment's assessments created in [from,to) by hour, day or week, grouped by up to two of decision, flow, recommendation, band, reason, lane, country, asn and list_match. Each assessment counts once, by its first answer; late results do not count it again and appear in late_flips. Optional metrics add a score histogram per flow, that histogram by the latest reported outcome, and late account decision changes. from and to start a bucket and cover at most 366 days (31 for hour buckets) inside the retention period. The filters are search's and describe the first answer: send them to search with revision first to list a cell's assessments. Counts hold no identifier, stay when an assessment or account is deleted, and report reasons by code and impact band. No Idempotency-Key.
   */
  async aggregate(
    request: models.AssessmentAggregateRequest,
    options?: RequestOptions,
  ): Promise<operations.AggregateAssessmentsResponse> {
    return unwrapAsync(assessmentsAggregate(
      this,
      request,
      options,
    ));
  }

  /**
   * Search assessments across this environment
   *
   * @remarks
   * Search retained assessments created in [from,to), over at most 366 days. Filters use each assessment decision, rather than the current account decision. Results can change between pages. Keep the assessment version to retrieve the exact decision later. Each item's detail.identifiers holds the identifiers its assessment was sent, exactly as received, and first_decision holds the decision of its first answer. email finds every assessment of the accounts that sent a mailbox, matched as lists match it. changed keeps the assessments a later revision changed. total counts every match, exactly up to 10000. This read does not require an idempotency key.
   */
  async search(
    request: models.AssessmentSearchRequest,
    options?: RequestOptions,
  ): Promise<operations.SearchAssessmentsResponse> {
    return unwrapAsync(assessmentsSearch(
      this,
      request,
      options,
    ));
  }

  /**
   * Retrieve an exact assessment revision
   *
   * @remarks
   * Retrieve a retained assessment version with its original decision, policy, flow and depth. This response excludes the current account decision. Current retention and response-mode permissions still apply. detail.identifiers holds the identifiers the assessment was sent, exactly as received.
   */
  async retrieveVersion(
    request: operations.GetAssessmentVersionRequest,
    options?: RequestOptions,
  ): Promise<operations.GetAssessmentVersionResponse> {
    return unwrapAsync(assessmentsRetrieveVersion(
      this,
      request,
      options,
    ));
  }

  /**
   * Bind a provisional signup account
   *
   * @remarks
   * One-time association to an opaque stable customer account. The assessment is its natural idempotency key. Repeating the same binding returns its first receipt; a conflicting target is refused. No arbitrary account merging.
   */
  async bindAccount(
    request: operations.BindProvisionalAccountRequest,
    options?: RequestOptions,
  ): Promise<operations.BindProvisionalAccountResponse> {
    return unwrapAsync(assessmentsBindAccount(
      this,
      request,
      options,
    ));
  }
}
