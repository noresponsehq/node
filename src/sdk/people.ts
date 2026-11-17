import { peopleCreate } from "../funcs/people-create.js";
import { peopleDelete } from "../funcs/people-delete.js";
import { peopleGet } from "../funcs/people-get.js";
import { peopleJudgeRecord } from "../funcs/people-judge-record.js";
import { peopleList } from "../funcs/people-list.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class People extends ClientSDK {
  /**
   * List workspace people.
   *
   * @remarks
   * Lists retained people in the key workspace and environment, including people in no group. Each returned person records a person.viewed audit event. Expired people are excluded before background deletion.
   */
  async list(
    request?: operations.ListWorkspacePeopleRequest | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListWorkspacePeopleResponse> {
    return unwrapAsync(peopleList(
      this,
      request,
      options,
    ));
  }

  /**
   * Create or reuse a workspace person.
   *
   * @remarks
   * Creates a person without a group. An explicit person_id or external_id reuses the named workspace person. A reference-only request keeps submitted details; identity supplied with that reference replaces those details. A shared email or phone only suggests a match. Suggested matches are returned only with people-read access. The workspace retention setting determines expires_at. An existing person keeps their original expiry. An Idempotency-Key returns the same retained person on retries, without creating another. Changed input with the same key answers 409 idempotency_key_reused. A customer reference that names another person or several people answers 409 person_reference_conflict.
   */
  async create(
    request: operations.CreateWorkspacePersonRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateWorkspacePersonResponse> {
    return unwrapAsync(peopleCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * Read a workspace person.
   *
   * @remarks
   * Returns submitted details, the current retention expiry and the most recent retained completed or partial investigation evidence, together with retained follow-up search evidence from all of this person's groups. Search evidence remains available after its group is deleted. Migrated results whose original per-person status is unknown may also supply evidence. Earlier results and pending jobs remain available through investigation history; each investigation retains its own collected result. Full source records, posts and media are returned by default; explicit evidence.read denial withholds collected evidence and free-text notes. Each read records person.viewed without raw evidence in the audit log. A missing or expired person answers 404.
   */
  async get(
    request: operations.GetWorkspacePersonRequest,
    options?: RequestOptions,
  ): Promise<operations.GetWorkspacePersonResponse> {
    return unwrapAsync(peopleGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Delete a workspace person.
   *
   * @remarks
   * Deletes a person and their retained evidence, investigation history and group memberships. Requires the separate delete permission. The audit retains only the person id and deletion metadata.
   */
  async delete(
    request: operations.DeleteWorkspacePersonRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteWorkspacePersonResponse | undefined> {
    return unwrapAsync(peopleDelete(
      this,
      request,
      options,
    ));
  }

  /**
   * Join one of a workspace person's records to them, or reject it.
   *
   * @remarks
   * Records a verdict on one of the records the person report holds: joined makes the record the person's whatever its likelihood, and rejected keeps it a lead that leads nowhere. The verdict belongs to the person on their own: the person report and enrichment follow it, and each group keeps its own verdicts. It sticks for as long as the person's evidence holds the same record, and a later verdict on the same record replaces it. After each verdict, enrichment reads the person again under the environment's enrichment setting: it starts no search from a rejected record or from what a search of it found, and a joined record's values lead on. A record the person report does not hold answers 404. Each verdict is audited as person.record_judged. The decisions scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
   */
  async judgeRecord(
    request: operations.JudgeWorkspacePersonRecordRequest,
    options?: RequestOptions,
  ): Promise<operations.JudgeWorkspacePersonRecordResponse> {
    return unwrapAsync(peopleJudgeRecord(
      this,
      request,
      options,
    ));
  }
}
