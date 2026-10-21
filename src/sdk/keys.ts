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
}
