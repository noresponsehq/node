import { groupsAddPeople } from "../funcs/groups-add-people.js";
import { groupsCancelScreening } from "../funcs/groups-cancel-screening.js";
import { groupsCreate } from "../funcs/groups-create.js";
import { groupsDelete } from "../funcs/groups-delete.js";
import { groupsExportPeople } from "../funcs/groups-export-people.js";
import { groupsGetPerson } from "../funcs/groups-get-person.js";
import { groupsGetScreening } from "../funcs/groups-get-screening.js";
import { groupsGet } from "../funcs/groups-get.js";
import { groupsJudgeRecord } from "../funcs/groups-judge-record.js";
import { groupsListPeople } from "../funcs/groups-list-people.js";
import { groupsListScreenings } from "../funcs/groups-list-screenings.js";
import { groupsList } from "../funcs/groups-list.js";
import { groupsRemovePerson } from "../funcs/groups-remove-person.js";
import { groupsReviewPerson } from "../funcs/groups-review-person.js";
import { groupsRunSearch } from "../funcs/groups-run-search.js";
import { groupsStartScreening } from "../funcs/groups-start-screening.js";
import { groupsStartSearch } from "../funcs/groups-start-search.js";
import { groupsUpdate } from "../funcs/groups-update.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Groups extends ClientSDK {
  /**
   * List an environment's groups.
   *
   * @remarks
   * Groups, newest first. The people scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
   */
  async list(
    request?: operations.ListGroupsRequest | undefined,
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
   * Creates a group with its name, start, venue, host, the principals it protects and the sensitive topics its screening reads posts against. An environment holds at most 1000 groups. Send an Idempotency-Key to retry safely: the same key and request return the same resource in its current state while it is retained, even after work completes. Reusing the key with different input answers 409 idempotency_key_reused. Use a new key for a deliberate new operation. The people_write scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
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
   * The group and how many people it holds. The people scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
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
   * Changes the fields the body names. With expected_version, the change applies only to that version (409 group_conflict otherwise). The people_write scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
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
   * Deletes the group, its memberships and its review context, and cancels unfinished group work. Workspace people, source evidence and completed investigations remain available. Retained investigations no longer name the deleted group. The delete scope is required; group read, write, investigation and review access do not grant deletion. The API key selects the workspace and environment.
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
   * The roster in upload order, with each person's role, match state, highest finding band and decision. Filter by band (or none), decision (or undecided) and role (or unstated). The people scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
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
   * Adds 1 to 500 workspace people to this group, at most 512 KiB. An explicit person_id or external_id reuses the named workspace person. A reference-only row keeps submitted details; an identity supplied with that reference replaces those details. A shared email or phone only suggests matches and does not merge people. A changed identity clears current group screening summaries; prior investigation history remains available. Identities are encrypted under the workspace key. Idempotency-Key is required: the same key and body return the original import result with Idempotent-Replayed: true while its people remain retained. An expired or deleted imported person answers 404; expired or deleted match suggestions are omitted. A different body answers 409 idempotency_key_reused. A group holds at most 20000 people. The people_write scope grants this operation; groups is also accepted. Suggested matches require people-read access. The API key selects the workspace and environment.
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
   * Returns submitted details, this group's latest screening evidence and contextual decisions, and the other groups that explicitly include the same workspace person. Membership requires an explicit person or customer reference. The people scope grants this operation; groups is also accepted. Each successful read is durably audited as person.viewed. Full source records, posts and media are returned by default. Explicit evidence.read denial keeps submitted details, coverage, job status and decision summaries, hides collected evidence and free-text notes, and sets evidence_restricted to true. The API key selects the workspace and environment.
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
   * Remove a person from a group
   *
   * @remarks
   * Removes this membership and its group review history. Keeps the workspace person, source evidence and completed investigations. Needs delete access. The API key selects the workspace and environment.
   */
  async removePerson(
    request: operations.RemoveGroupPersonRequest,
    options?: RequestOptions,
  ): Promise<operations.RemoveGroupPersonResponse | undefined> {
    return unwrapAsync(groupsRemovePerson(
      this,
      request,
      options,
    ));
  }

  /**
   * Record a decision on a person.
   *
   * @remarks
   * Marks the person cleared, watch or escalated with a note. Decisions are kept in order; the latest is the person's. The next screening refreshes everyone on watch or escalated. The decisions scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
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
   * Join one of a person's records to them, or reject it.
   *
   * @remarks
   * Records a verdict on one of the records the person's latest lookups found: joined makes the record the person's whatever its likelihood, and rejected keeps it a lead. The verdict sticks for as long as a lookup finds the same record, and a later verdict on the same record replaces it. A record the person's latest lookup does not hold answers 404. Each verdict is audited as person.record_judged. The decisions scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
   */
  async judgeRecord(
    request: operations.JudgeRecordRequest,
    options?: RequestOptions,
  ): Promise<operations.JudgeRecordResponse> {
    return unwrapAsync(groupsJudgeRecord(
      this,
      request,
      options,
    ));
  }

  /**
   * Search again on a value of one of a person's records.
   *
   * @remarks
   * Starts a new search on the value of one field of one of the person's records: a lookup's, a profile's or one an earlier search found. Name the record and the field; the value itself is not sent. The field's kind must be email, phone, username, person_name, password, hash, ip or domain. A domain search finds the breach rows of every email address at the domain, which must be a registrable domain or a host under one; any other domain answers 400. Nothing ever searches again by itself: a search starts only when a person asks. The search runs the breach search and the account and phone lookups that take the value's kind, under the environment's source controls, and finishes seconds later. A password or hash search counts first: it stops at counted with rows, how many breach rows hold the value, and runs only when a person runs it. Name a table, as a lookup remaining entry names it, to fetch the rows an earlier search left out, up to 100. What the search finds joins the person's lookup records as leads, each match naming the search; the person report lists the searches, each with the value and the record and field it came from, and its records are scored like the rest. Without an Idempotency-Key, starting the same open search returns it. Its estimate counts against the environment's screening_daily_cap, and one the cap cannot hold answers 409 screening_cap_exceeded. A record or field the person does not hold answers 404. Each search is audited as person.search_started. Send an Idempotency-Key to retry safely: the same key and request return the same resource in its current state while it is retained, even after work completes. Reusing the key with different input answers 409 idempotency_key_reused. Use a new key for a deliberate new operation. The investigations scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
   */
  async startSearch(
    request: operations.StartSearchRequest,
    options?: RequestOptions,
  ): Promise<operations.StartSearchResponse> {
    return unwrapAsync(groupsStartSearch(
      this,
      request,
      options,
    ));
  }

  /**
   * Run a counted password or hash search.
   *
   * @remarks
   * Runs a password or hash search once a person has seen its count. A search still counting answers 409 group_conflict; one already queued, running or finished answers as it is. The body is an empty object. Its estimate counts against the environment's screening_daily_cap. Each run is audited as person.search_run. The investigations scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
   */
  async runSearch(
    request: operations.RunSearchRequest,
    options?: RequestOptions,
  ): Promise<operations.RunSearchResponse> {
    return unwrapAsync(groupsRunSearch(
      this,
      request,
      options,
    ));
  }

  /**
   * List a group's screenings.
   *
   * @remarks
   * Screenings, newest first. The people scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
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
   * Queues a screening of every person no screening has reached and everyone on watch or escalated. One screening of a group runs at a time; it finishes completed, partial (some people not covered, counted in people_failed) or failed, and fails with error_code expired after 24 hours. Idempotency-Key is required and binds the body for the screening's life. The 202 body carries estimated_spend, what the selected people would cost at the depth and platforms. A screening whose estimate exceeds the environment's screening_daily_cap, less the day's recorded spend and what open screenings may still spend, answers 409 screening_cap_exceeded and queues nothing. The test environment screens with a deterministic simulator that contacts no source. A platform that no connector serves in the environment answers 409 screening_unavailable. The investigations scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
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
   * The screening's status and progress. The people scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
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
   * Stops a queued or running screening. People it already screened keep their results. Cancelling a finished screening answers it unchanged. The body is an empty object. The investigations scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
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

  /**
   * Export the people in a group.
   *
   * @remarks
   * Returns one page for export. Each returned person is durably audited as person.exported with the actor, group, person ID and request ID. Requires both people read access and exports. Explicit evidence restrictions also hide free-text decision notes. No raw evidence enters audit logs. Follow next_after until absent for a complete export. The API key selects the workspace and environment.
   */
  async exportPeople(
    request: operations.ExportPeopleRequest,
    options?: RequestOptions,
  ): Promise<operations.ExportPeopleResponse> {
    return unwrapAsync(groupsExportPeople(
      this,
      request,
      options,
    ));
  }
}
