import { membersList } from "../funcs/members-list.js";
import { membersRemove } from "../funcs/members-remove.js";
import { membersUpdate } from "../funcs/members-update.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Members extends ClientSDK {
  /**
   * List a workspace's members.
   *
   * @remarks
   * Read the workspace directory with a live key carrying members or members_manage. Member identities and grants belong to this workspace. Owner-controlled issuance limits team automation to authorised service credentials.
   */
  async list(
    request: operations.ListMembersRequest,
    options?: RequestOptions,
  ): Promise<operations.ListMembersResponse> {
    return unwrapAsync(membersList(
      this,
      request,
      options,
    ));
  }

  /**
   * Change a member's role.
   *
   * @remarks
   * Update a non-owner member role, environment access or sensitive permission exclusions with a live members_manage key. Owner changes, identity binding and support access remain outside this scope. The current delegation ceiling is checked within the change transaction.
   */
  async update(
    request: operations.UpdateMemberRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateMemberResponse> {
    return unwrapAsync(membersUpdate(
      this,
      request,
      options,
    ));
  }

  /**
   * Remove a member.
   *
   * @remarks
   * Remove a non-owner member with a live members_manage key. Subsequent access is refused and personal credentials are revoked. Independently owned service credentials follow their own lifecycle.
   */
  async remove(
    request: operations.RemoveMemberRequest,
    options?: RequestOptions,
  ): Promise<operations.RemoveMemberResponse | undefined> {
    return unwrapAsync(membersRemove(
      this,
      request,
      options,
    ));
  }
}
