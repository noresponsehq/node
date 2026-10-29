import { evaluationsCancel } from "../funcs/evaluations-cancel.js";
import { evaluationsCreate } from "../funcs/evaluations-create.js";
import { evaluationsGetResult } from "../funcs/evaluations-get-result.js";
import { evaluationsGet } from "../funcs/evaluations-get.js";
import { evaluationsList } from "../funcs/evaluations-list.js";
import { evaluationsPublish } from "../funcs/evaluations-publish.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { PageIterator, unwrapResultIterator } from "../types/operations.js";

export class Evaluations extends ClientSDK {
  /**
   * List retained policy evaluation jobs.
   *
   * @remarks
   * List retained policy evaluation jobs for this environment, newest first. At most five jobs are retained for their 24-hour evidence lifetime. Use next_before as before on the next page.
   */
  async list(
    request: operations.ListPolicyEvaluationsRequest,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.ListPolicyEvaluationsResponse, { cursor: string }>
  > {
    return unwrapResultIterator(evaluationsList(
      this,
      request,
      options,
    ));
  }

  /**
   * Freeze an evaluation cohort and queue a bounded job.
   *
   * @remarks
   * Create a bounded evaluation with an Idempotency-Key, expected policy version, fixed candidates, cohort, seed and cost assumptions. Evidence is frozen before evaluation and recorded by hashes. Limits are 1000 accounts, 50000 request attempts and 64 MiB. Capture completeness is currently unknown, so results are no_change and cannot be published. The evaluation fetches no new source evidence and changes no live policy.
   */
  async create(
    request: operations.CreatePolicyEvaluationRequest,
    options?: RequestOptions,
  ): Promise<operations.CreatePolicyEvaluationResponse> {
    return unwrapAsync(evaluationsCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * Read evaluation state and provenance.
   *
   * @remarks
   * Read a retained evaluation job and its capture and provenance metadata. Cancellation, source erasure, retention reduction and expiry can make a result unavailable.
   */
  async get(
    request: operations.GetPolicyEvaluationRequest,
    options?: RequestOptions,
  ): Promise<operations.GetPolicyEvaluationResponse> {
    return unwrapAsync(evaluationsGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Read the bounded completed evaluator report.
   *
   * @remarks
   * Read the completed evaluation report, including coverage, uncertainty and candidate results. Unknown capture completeness produces no_change. A completed result is not an automatic policy change.
   */
  async getResult(
    request: operations.GetPolicyEvaluationResultRequest,
    options?: RequestOptions,
  ): Promise<operations.GetPolicyEvaluationResultResponse> {
    return unwrapAsync(evaluationsGetResult(
      this,
      request,
      options,
    ));
  }

  /**
   * Cancel processing and destroy retained evidence and report.
   *
   * @remarks
   * Cancel a queued or running evaluation and invalidate its stored evidence. The operation does not change policy. Send an empty JSON object.
   */
  async cancel(
    request: operations.CancelPolicyEvaluationRequest,
    options?: RequestOptions,
  ): Promise<operations.CancelPolicyEvaluationResponse> {
    return unwrapAsync(evaluationsCancel(
      this,
      request,
      options,
    ));
  }

  /**
   * Publish an explicitly reviewed proposal with exact provenance.
   *
   * @remarks
   * Publish an explicitly reviewed candidate with its exact manifest, input and result hashes and unchanged baseline policy version. Requires settings plus policy_publish, or legacy management. Publication creates a fresh policy version and immutable provenance. no_change, expired or invalidated results are refused.
   */
  async publish(
    request: operations.PublishPolicyEvaluationRequest,
    options?: RequestOptions,
  ): Promise<operations.PublishPolicyEvaluationResponse> {
    return unwrapAsync(evaluationsPublish(
      this,
      request,
      options,
    ));
  }
}
