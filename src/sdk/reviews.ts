import { reviewsAddSubject } from "../funcs/reviews-add-subject.js";
import { reviewsComment } from "../funcs/reviews-comment.js";
import { reviewsCreateView } from "../funcs/reviews-create-view.js";
import { reviewsCreate } from "../funcs/reviews-create.js";
import { reviewsDeleteSubject } from "../funcs/reviews-delete-subject.js";
import { reviewsDeleteView } from "../funcs/reviews-delete-view.js";
import { reviewsExport } from "../funcs/reviews-export.js";
import { reviewsGet } from "../funcs/reviews-get.js";
import { reviewsListComments } from "../funcs/reviews-list-comments.js";
import { reviewsListResolutions } from "../funcs/reviews-list-resolutions.js";
import { reviewsListSubjects } from "../funcs/reviews-list-subjects.js";
import { reviewsListViews } from "../funcs/reviews-list-views.js";
import { reviewsList } from "../funcs/reviews-list.js";
import { reviewsResolve } from "../funcs/reviews-resolve.js";
import { reviewsUpdateView } from "../funcs/reviews-update-view.js";
import { reviewsUpdate } from "../funcs/reviews-update.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { PageIterator, unwrapResultIterator } from "../types/operations.js";

export class Reviews extends ClientSDK {
  /**
   * List retained account reviews.
   *
   * @remarks
   * List retained investigation reviews using filters and an authenticated cursor.
   */
  async list(
    request: operations.ListReviewsRequest,
    options?: RequestOptions,
  ): Promise<PageIterator<operations.ListReviewsResponse, { cursor: string }>> {
    return unwrapResultIterator(reviewsList(
      this,
      request,
      options,
    ));
  }

  /**
   * Open a review for a retained account.
   *
   * @remarks
   * Open a review for one account. An account can have one active review in its environment.
   */
  async create(
    request: operations.CreateReviewRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateReviewResponse> {
    return unwrapAsync(reviewsCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * Read an account review.
   *
   * @remarks
   * Read a retained review and its current version.
   */
  async get(
    request: operations.GetReviewRequest,
    options?: RequestOptions,
  ): Promise<operations.GetReviewResponse> {
    return unwrapAsync(reviewsGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Assign, prioritize or reopen a guarded review.
   *
   * @remarks
   * Change review status, priority or assignment after checking the expected version.
   */
  async update(
    request: operations.UpdateReviewRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateReviewResponse> {
    return unwrapAsync(reviewsUpdate(
      this,
      request,
      options,
    ));
  }

  /**
   * Resolve a review against an exact account risk version.
   *
   * @remarks
   * Resolve a review against the exact current review and account decision versions. A resolution does not report a factual outcome or execute enforcement.
   */
  async resolve(
    request: operations.ResolveReviewRequest,
    options?: RequestOptions,
  ): Promise<operations.ResolveReviewResponse> {
    return unwrapAsync(reviewsResolve(
      this,
      request,
      options,
    ));
  }

  /**
   * Read retained review comments.
   *
   * @remarks
   * Page through retained review comments.
   */
  async listComments(
    request: operations.ListReviewCommentsRequest,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.ListReviewCommentsResponse, { cursor: string }>
  > {
    return unwrapResultIterator(reviewsListComments(
      this,
      request,
      options,
    ));
  }

  /**
   * Append a comment against the current review version.
   *
   * @remarks
   * Append a comment after checking the expected review version.
   */
  async comment(
    request: operations.CommentReviewRequest,
    options?: RequestOptions,
  ): Promise<operations.CommentReviewResponse> {
    return unwrapAsync(reviewsComment(
      this,
      request,
      options,
    ));
  }

  /**
   * Read immutable review resolution history.
   *
   * @remarks
   * Page through immutable review resolutions.
   */
  async listResolutions(
    request: operations.ListReviewResolutionsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListReviewResolutionsResponse> {
    return unwrapAsync(reviewsListResolutions(
      this,
      request,
      options,
    ));
  }

  /**
   * List your private and shared review filters.
   *
   * @remarks
   * List private and shared saved review filters visible to you.
   */
  async listViews(
    request: operations.ListReviewViewsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListReviewViewsResponse> {
    return unwrapAsync(reviewsListViews(
      this,
      request,
      options,
    ));
  }

  /**
   * Save a tenant-local review filter.
   *
   * @remarks
   * Save a private or shared review filter.
   */
  async createView(
    request: operations.CreateReviewViewRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateReviewViewResponse> {
    return unwrapAsync(reviewsCreateView(
      this,
      request,
      options,
    ));
  }

  /**
   * Replace your saved filter with optimistic concurrency.
   *
   * @remarks
   * Update your saved review filter after checking its expected version.
   */
  async updateView(
    request: operations.UpdateReviewViewRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateReviewViewResponse> {
    return unwrapAsync(reviewsUpdateView(
      this,
      request,
      options,
    ));
  }

  /**
   * Delete your saved filter with optimistic concurrency.
   *
   * @remarks
   * Delete your saved review filter after checking its expected version.
   */
  async deleteView(
    request: operations.DeleteReviewViewRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteReviewViewResponse | undefined> {
    return unwrapAsync(reviewsDeleteView(
      this,
      request,
      options,
    ));
  }

  /**
   * Export an account review
   *
   * @remarks
   * Export retained review details, comments, resolutions and linked subjects. Requires current reviews.read and exports.read; API keys need management together with exports, history or audit_manage. The audit event commits before any bytes are returned. Oversized exports are refused without truncation; use the bounded collection APIs.
   */
  async export(
    request: operations.ExportReviewRequest,
    options?: RequestOptions,
  ): Promise<operations.ExportReviewResponse> {
    return unwrapAsync(reviewsExport(
      this,
      request,
      options,
    ));
  }

  /**
   * List retained subjects linked to a review.
   *
   * @remarks
   * List retained subjects linked to this review. A link supplies investigation context and does not prove a relationship or change account risk.
   */
  async listSubjects(
    request: operations.ListReviewSubjectsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListReviewSubjectsResponse> {
    return unwrapAsync(reviewsListSubjects(
      this,
      request,
      options,
    ));
  }

  /**
   * Link retained tenant-local evidence to an investigation.
   *
   * @remarks
   * Link an account, exact assessment revision or issued-key association within this environment. Supply the expected review version. A review permits 100 links. Erasure removes links to erased subjects. This action records context without creating feedback or enforcement.
   */
  async addSubject(
    request: operations.AddReviewSubjectRequest,
    options?: RequestOptions,
  ): Promise<operations.AddReviewSubjectResponse> {
    return unwrapAsync(reviewsAddSubject(
      this,
      request,
      options,
    ));
  }

  /**
   * Remove a linked subject using the current review version.
   *
   * @remarks
   * Remove a subject link with the expected review version. The linked account, assessment or key association remains unchanged.
   */
  async deleteSubject(
    request: operations.DeleteReviewSubjectRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteReviewSubjectResponse> {
    return unwrapAsync(reviewsDeleteSubject(
      this,
      request,
      options,
    ));
  }
}
