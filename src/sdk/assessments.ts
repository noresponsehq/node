import { assessmentsCreate } from "../funcs/assessments-create.js";
import { assessmentsGet } from "../funcs/assessments-get.js";
import { assessmentsQuery } from "../funcs/assessments-query.js";
import { assessmentsRecordOutcome } from "../funcs/assessments-record-outcome.js";
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
   * Returns within the deadline (500 ms at most) with a complete, partial or pending assessment: 200 carries complete or partial, 202 carries pending with Location and Retry-After. A pending answer has no recommendation; apply your own fallback for pending, 429, 503 or a timeout. risk.block says when your block threshold was reached. Requires the assess scope. Idempotency-Key is required and is bound to the body for 24 hours: the same key with the same body replays the latest assessment with Idempotent-Replayed: true and starts no new work; the same key with a different body answers 409 idempotency_key_reused. response_mode defaults to standard; detailed needs the detailed scope.
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
   * Returns the highest assessment_version. Requires the assess or history scope. While status is pending, or partial with a source still running, the response carries Retry-After; poll no faster than it says. Another tenant's assessment, an unknown or expired assessment and a malformed assessment_id all answer 404 not_found. response_mode=detailed needs the detailed scope.
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
   * History is a POST with account_id in the body so an account identifier stays out of URLs and access logs. Requires the history scope. Read-only and safe to retry. Newest first, each at its latest assessment_version. An account with no assessments answers 200 with empty items. The cursor is opaque and bound to your tenant and the account; a tampered or expired cursor answers 400 invalid_cursor. response_mode=detailed needs the detailed scope.
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
}
