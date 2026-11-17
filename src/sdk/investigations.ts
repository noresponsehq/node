import { investigationsCancel } from "../funcs/investigations-cancel.js";
import { investigationsCreate } from "../funcs/investigations-create.js";
import { investigationsGet } from "../funcs/investigations-get.js";
import { investigationsList } from "../funcs/investigations-list.js";
import { investigationsReview } from "../funcs/investigations-review.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Investigations extends ClientSDK {
  /**
   * List investigation history.
   *
   * @remarks
   * List investigation history. The API key determines the workspace and environment.
   */
  async list(
    request?: operations.ListInvestigationsRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListInvestigationsResponse> {
    return unwrapAsync(investigationsList(
      this,
      request,
      options,
    ));
  }

  /**
   * Start an investigation for a person.
   *
   * @remarks
   * Starts an investigation against a retained workspace person, independently of group membership. enrichment overrides, field by field, how the environment's enrichment setting runs after this investigation; the person's latest investigation decides the enrichment that runs on them. Idempotency-Key is required: the same key and input return the same retained job in its current state without repeating billable work. Different input with that key answers 409 idempotency_key_reused; a deliberate new investigation uses a new key. The response includes Location and Retry-After. The person's retention expiry limits both execution and retained history. The API key selects the workspace and environment.
   */
  async create(
    request: operations.CreateInvestigationRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateInvestigationResponse> {
    return unwrapAsync(investigationsCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * Read an investigation and its evidence.
   *
   * @remarks
   * Returns this investigation's status, coverage, source records, posts, media and contextual review history. Full evidence is returned by default; explicit evidence.read denial keeps submitted person details, status, coverage and decision summaries and hides collected evidence and free-text notes. The read is durably audited as person.viewed. The API key selects the workspace and environment. Missing, foreign or expired results answer 404.
   */
  async get(
    request: operations.GetInvestigationRequest,
    options?: RequestOptions,
  ): Promise<operations.GetInvestigationResponse> {
    return unwrapAsync(investigationsGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Record an investigation decision.
   *
   * @remarks
   * Record an investigation decision. The API key determines the workspace and environment.
   */
  async review(
    request: operations.ReviewInvestigationRequest,
    options?: RequestOptions,
  ): Promise<operations.ReviewInvestigationResponse> {
    return unwrapAsync(investigationsReview(
      this,
      request,
      options,
    ));
  }

  /**
   * Cancel an investigation
   *
   * @remarks
   * Stops this investigation. A completed or already cancelled investigation keeps its current result. Other investigations for the person keep running.
   */
  async cancel(
    request: operations.CancelInvestigationRequest,
    options?: RequestOptions,
  ): Promise<operations.CancelInvestigationResponse> {
    return unwrapAsync(investigationsCancel(
      this,
      request,
      options,
    ));
  }
}
