import { settingsGet } from "../funcs/settings-get.js";
import { settingsListHistory } from "../funcs/settings-list-history.js";
import { settingsPreview } from "../funcs/settings-preview.js";
import { settingsRestore } from "../funcs/settings-restore.js";
import { settingsUpdate } from "../funcs/settings-update.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Settings extends ClientSDK {
  /**
   * Read an environment's settings.
   *
   * @remarks
   * Read this environment retention, source selection and effective flow policies. A flow without its own thresholds inherits account_creation. Requires settings or management. Another environment answers404. Read-only and safe to retry.
   */
  async get(
    request: operations.GetSettingsRequest,
    options?: RequestOptions,
  ): Promise<operations.GetSettingsResponse> {
    return unwrapAsync(settingsGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Change an environment's settings.
   *
   * @remarks
   * Change named retention, source or flow settings in one transaction. Requires settings or management; changes to active policy also require policy_publish, which legacy management includes. Use expected_policy_version to reject concurrent changes and record a change_reason. Each accepted change creates a fresh version and an atomic audit event. Retention-only edits do not require policy publication authority. Flow thresholds preserve their declared ordering and bounds.
   */
  async update(
    request: operations.UpdateSettingsRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateSettingsResponse> {
    return unwrapAsync(settingsUpdate(
      this,
      request,
      options,
    ));
  }

  /**
   * Read immutable configuration versions.
   *
   * @remarks
   * Read immutable configuration versions in one environment with settings or management. Follow before_version for older records.
   */
  async listHistory(
    request: operations.ListPolicyHistoryRequest,
    options?: RequestOptions,
  ): Promise<operations.ListPolicyHistoryResponse> {
    return unwrapAsync(settingsListHistory(
      this,
      request,
      options,
    ));
  }

  /**
   * Restore captured settings as a new guarded version.
   *
   * @remarks
   * Restore a retained configuration as a fresh version with the expected current version and a change reason. Requires settings plus policy_publish, or legacy management. Restore preserves the historical record and does not undo customer enforcement.
   */
  async restore(
    request: operations.RestorePolicyRequest,
    options?: RequestOptions,
  ): Promise<operations.RestorePolicyResponse> {
    return unwrapAsync(settingsRestore(
      this,
      request,
      options,
    ));
  }

  /**
   * Preview exact retained-score threshold transitions without side effects.
   *
   * @remarks
   * Compare proposed policy with bounded retained first answers, including baseline, coverage and uncertainty. Requires settings or management. This read starts no provider work and publishes no changes.
   */
  async preview(
    request: operations.PreviewPolicyRequest,
    options?: RequestOptions,
  ): Promise<operations.PreviewPolicyResponse> {
    return unwrapAsync(settingsPreview(
      this,
      request,
      options,
    ));
  }
}
