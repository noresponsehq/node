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
   * Create an API key in the signing key environment with authority no greater than the issuer holds. Requires management. Optional name, purpose, kind and expiry describe its lifecycle. Send request_id for safe issuance retries: the first successful response returns the secret once; a repeat returns existing metadata without the secret, and changed parameters conflict. Without request_id a retry can create another key. A service credential is independent of its issuer; personal credentials require an authenticated member and retire when that member loses authority.
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
