import { keysCreate } from "../funcs/keys-create.js";
import { keysList } from "../funcs/keys-list.js";
import { keysRevoke } from "../funcs/keys-revoke.js";
import { keysRotate } from "../funcs/keys-rotate.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Keys extends ClientSDK {
  /**
   * Rotate the API key that signs the request.
   *
   * @remarks
   * Mints a new key with the same scopes as the key that signs the request and returns it once. The presented key keeps working for overlap_seconds (default 24 hours, from 60 seconds to 7 days), then answers 401. A key accepts one rotation: rotating again with a key already in its overlap answers 409 key_rotation_in_progress, so rotate with the new key. Rotation is not idempotent: a retry after a lost answer mints another key.
   */
  async rotate(
    request: models.KeyRotationRequest,
    options?: RequestOptions,
  ): Promise<operations.RotateApiKeyResponse> {
    return unwrapAsync(keysRotate(
      this,
      request,
      options,
    ));
  }

  /**
   * Create an API key.
   *
   * @remarks
   * Creates an API key in the environment of the key that signs the request, with scopes that key holds itself, and returns its secret once in key. Requires the management scope; the new key may hold it too. A scope the signing key lacks answers 403 workspace_forbidden, and the other environment 404 not_found. An environment holds at most 100 keys that authenticate (409 key_limit_reached). created_by is the signing key's prefix. Not idempotent: a retry after a lost answer creates a second key, which you can list and revoke.
   */
  async create(
    request: operations.CreateKeyRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateKeyResponse> {
    return unwrapAsync(keysCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * List API keys.
   *
   * @remarks
   * Lists the keys of the signing key's environment, newest first, at most 200, revoked and expired keys included, without secrets: each key's id, prefix, scopes, status, and who created and revoked it. Requires the management scope. Read-only and safe to retry.
   */
  async list(
    request: operations.ListKeysRequest,
    options?: RequestOptions,
  ): Promise<operations.ListKeysResponse> {
    return unwrapAsync(keysList(
      this,
      request,
      options,
    ));
  }

  /**
   * Revoke an API key.
   *
   * @remarks
   * Revokes a key of the signing key's environment at once: its next request answers 401. Requires the management scope. A key of the other environment or of another workspace answers 404 not_found. A key cannot revoke itself (409 self_revocation): rotate it with keys.rotate, or revoke it with another management key. Revoking a revoked key changes nothing and answers the key as it was revoked, so a retry is safe.
   */
  async revoke(
    request: operations.RevokeKeyRequest,
    options?: RequestOptions,
  ): Promise<operations.RevokeKeyResponse> {
    return unwrapAsync(keysRevoke(
      this,
      request,
      options,
    ));
  }
}
