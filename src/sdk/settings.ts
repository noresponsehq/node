import { settingsGet } from "../funcs/settings-get.js";
import { settingsUpdate } from "../funcs/settings-update.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Settings extends ClientSDK {
  /**
   * Read an environment's settings.
   *
   * @remarks
   * Reads the settings of the signing key's environment: retention in days; per flow (account_creation, login, purchase) the step_up, review and block thresholds, the default depth and the admission; and the sources the environment refuses. A flow without thresholds of its own shows account_creation's with inherits_account_creation true. Requires the management scope; the other environment answers 404 not_found. Read-only and safe to retry.
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
   * Changes only what the body names, in one transaction: retention_days, refused_sources, and per flow step_up, review, block (null turns blocking off), default_depth, admission, hold_seconds, on_expiry, or inherits_account_creation to return login or purchase to account_creation's thresholds. After the change each flow keeps 0 < step_up < review <= 100 and block off or review <= block <= 100; a change that breaks it answers 400 naming the flow. A policy change is one new policy_version with the signing key's prefix as updated_by, and every change is recorded in the workspace's audit log with the key as its actor. Requires the management scope; the other environment answers 404 not_found. A change reaches assessments within a minute.
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
}
