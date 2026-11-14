import { groupsAddPeople } from "../funcs/groups-add-people.js";
import { groupsCancelScreening } from "../funcs/groups-cancel-screening.js";
import { groupsCreate } from "../funcs/groups-create.js";
import { groupsDelete } from "../funcs/groups-delete.js";
import { groupsGetPerson } from "../funcs/groups-get-person.js";
import { groupsGetScreening } from "../funcs/groups-get-screening.js";
import { groupsGet } from "../funcs/groups-get.js";
import { groupsListPeople } from "../funcs/groups-list-people.js";
import { groupsListScreenings } from "../funcs/groups-list-screenings.js";
import { groupsList } from "../funcs/groups-list.js";
import { groupsReviewPerson } from "../funcs/groups-review-person.js";
import { groupsStartScreening } from "../funcs/groups-start-screening.js";
import { groupsUpdate } from "../funcs/groups-update.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Groups extends ClientSDK {
  /**
   * List an environment's groups.
   *
   * @remarks
   * List this environment's groups, newest first. Pass next_before back as before for the next page. Requires the groups scope.
   */
  async list(
    request: operations.ListGroupsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListGroupsResponse> {
    return unwrapAsync(groupsList(
      this,
      request,
      options,
    ));
  }

  /**
   * Create a group to screen.
   *
   * @remarks
   * Create a group to screen: its name, start, venue, host, the principals it protects and the sensitive topics posts are read against. An environment holds at most 1000 groups.
   */
  async create(
    request: operations.CreateGroupRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateGroupResponse> {
    return unwrapAsync(groupsCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * Read a group.
   *
   * @remarks
   * Read a group and how many people it holds.
   */
  async get(
    request: operations.GetGroupRequest,
    options?: RequestOptions,
  ): Promise<operations.GetGroupResponse> {
    return unwrapAsync(groupsGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Change a group.
   *
   * @remarks
   * Change the fields you name. Send expected_version to apply the change only to that version.
   */
  async update(
    request: operations.UpdateGroupRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateGroupResponse> {
    return unwrapAsync(groupsUpdate(
      this,
      request,
      options,
    ));
  }

  /**
   * Erase a group.
   *
   * @remarks
   * Erase a group with its people, their decisions and its screenings, and stop any screening still running.
   */
  async delete(
    request: operations.DeleteGroupRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteGroupResponse | undefined> {
    return unwrapAsync(groupsDelete(
      this,
      request,
      options,
    ));
  }

  /**
   * List a group's people.
   *
   * @remarks
   * Read a group's roster in upload order, with each person's match state, highest finding band and decision. Filter by band or decision; pass next_after back as after.
   */
  async listPeople(
    request: operations.ListPeopleRequest,
    options?: RequestOptions,
  ): Promise<operations.ListPeopleResponse> {
    return unwrapAsync(groupsListPeople(
      this,
      request,
      options,
    ));
  }

  /**
   * Add or update a batch of people.
   *
   * @remarks
   * Add or update 1 to 500 people with an Idempotency-Key. A row with the same external_id, else email, else phone as an existing person updates it. Identities are stored encrypted.
   */
  async addPeople(
    request: operations.AddPeopleRequest,
    options?: RequestOptions,
  ): Promise<operations.AddPeopleResponse> {
    return unwrapAsync(groupsAddPeople(
      this,
      request,
      options,
    ));
  }

  /**
   * Read a person's report.
   *
   * @remarks
   * Read a person's report: matched profiles, findings with their evidence, every recorded decision, and the other groups where the same email or phone appears.
   */
  async getPerson(
    request: operations.GetPersonRequest,
    options?: RequestOptions,
  ): Promise<operations.GetPersonResponse> {
    return unwrapAsync(groupsGetPerson(
      this,
      request,
      options,
    ));
  }

  /**
   * Record a decision on a person.
   *
   * @remarks
   * Record a cleared, watch or escalated decision with a note. The latest decision is the person's; the next screening refreshes everyone on watch or escalated.
   */
  async reviewPerson(
    request: operations.ReviewPersonRequest,
    options?: RequestOptions,
  ): Promise<operations.ReviewPersonResponse> {
    return unwrapAsync(groupsReviewPerson(
      this,
      request,
      options,
    ));
  }

  /**
   * List a group's screenings.
   *
   * @remarks
   * List a group's screenings, newest first.
   */
  async listScreenings(
    request: operations.ListScreeningsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListScreeningsResponse> {
    return unwrapAsync(groupsListScreenings(
      this,
      request,
      options,
    ));
  }

  /**
   * Start a screening.
   *
   * @remarks
   * Start a screening of new people and everyone on watch or escalated, with an Idempotency-Key. It finishes completed, partial or failed minutes to hours later; poll it. The answer carries estimated_spend; a screening whose estimate exceeds what the daily screening cap has left answers 409 screening_cap_exceeded. The test environment screens with the synthetic connector, which makes up deterministic profiles, posts and findings.
   */
  async startScreening(
    request: operations.StartScreeningRequest,
    options?: RequestOptions,
  ): Promise<operations.StartScreeningResponse> {
    return unwrapAsync(groupsStartScreening(
      this,
      request,
      options,
    ));
  }

  /**
   * Read a screening.
   *
   * @remarks
   * Read a screening's status and progress.
   */
  async getScreening(
    request: operations.GetScreeningRequest,
    options?: RequestOptions,
  ): Promise<operations.GetScreeningResponse> {
    return unwrapAsync(groupsGetScreening(
      this,
      request,
      options,
    ));
  }

  /**
   * Cancel a screening.
   *
   * @remarks
   * Stop a queued or running screening. People already screened keep their results.
   */
  async cancelScreening(
    request: operations.CancelScreeningRequest,
    options?: RequestOptions,
  ): Promise<operations.CancelScreeningResponse> {
    return unwrapAsync(groupsCancelScreening(
      this,
      request,
      options,
    ));
  }
}
