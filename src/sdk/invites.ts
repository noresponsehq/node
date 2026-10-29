import { invitesCreate } from "../funcs/invites-create.js";
import { invitesList } from "../funcs/invites-list.js";
import { invitesResend } from "../funcs/invites-resend.js";
import { invitesRevoke } from "../funcs/invites-revoke.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Invites extends ClientSDK {
  /**
   * Invite a member.
   *
   * @remarks
   * Create a workspace-bound invite for a non-owner role with a live members_manage key. The new token is returned once. Set external_user_id to bind acceptance to an exact verified provider subject; email is contact information. Creating a token does not send an email.
   */
  async create(
    request: operations.CreateInviteRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateInviteResponse> {
    return unwrapAsync(invitesCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * List pending invites.
   *
   * @remarks
   * Read pending workspace invitations with a live members_manage key. Tokens are excluded. Expiry and token reissue timestamps describe invitation state; they do not establish email delivery.
   */
  async list(
    request: operations.ListInvitesRequest,
    options?: RequestOptions,
  ): Promise<operations.ListInvitesResponse> {
    return unwrapAsync(invitesList(
      this,
      request,
      options,
    ));
  }

  /**
   * Revoke an invite.
   *
   * @remarks
   * Revoke a pending invitation with a live members_manage key. A revoked token cannot be accepted. Owner-role invitations remain outside machine delegation.
   */
  async revoke(
    request: operations.RevokeInviteRequest,
    options?: RequestOptions,
  ): Promise<operations.RevokeInviteResponse | undefined> {
    return unwrapAsync(invitesRevoke(
      this,
      request,
      options,
    ));
  }

  /**
   * Reissue an invitation for delivery.
   *
   * @remarks
   * Reissue a pending non-owner invitation with a live members_manage key. The old token is invalidated and the new token is returned once with renewed expiry. Its role and permissions are preserved. This operation does not prove email delivery and is not automatically retried.
   */
  async resend(
    request: operations.ResendInviteRequest,
    options?: RequestOptions,
  ): Promise<operations.ResendInviteResponse> {
    return unwrapAsync(invitesResend(
      this,
      request,
      options,
    ));
  }
}
