import { integrationsCreate } from "../funcs/integrations-create.js";
import { integrationsDelete } from "../funcs/integrations-delete.js";
import { integrationsList } from "../funcs/integrations-list.js";
import { integrationsRotate } from "../funcs/integrations-rotate.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Integrations extends ClientSDK {
  /**
   * Register a hosted provider integration.
   *
   * @remarks
   * Registers a WorkOS or Auth0 integration and returns its hosted endpoint, url, so a sign-up or sign-in is scored with no server of your own. For WorkOS, send the Actions signing secret from the WorkOS dashboard and point the user registration and authentication Actions at url. For Auth0, the answer's secret is the shared secret of the NoResponse Auth0 Action, shown once: store it as an Action secret. hook_points defaults to both pre_registration and post_login; an event that is not listed is allowed without an assessment. The endpoint waits for the full assessment for at most 2.5 seconds (WorkOS) or 4.5 seconds (Auth0), denies only when risk.block is true and allows on any failure. Requires the integrations scope; at most 10 per account. Not idempotent: a retry after a lost answer registers another integration.
   */
  async create(
    request: models.IntegrationRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateIntegrationResponse> {
    return unwrapAsync(integrationsCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * List the workspace's integrations.
   *
   * @remarks
   * Every integration, oldest first. Listings carry no secrets. Requires the integrations scope.
   */
  async list(
    options?: RequestOptions,
  ): Promise<operations.ListIntegrationsResponse> {
    return unwrapAsync(integrationsList(
      this,
      options,
    ));
  }

  /**
   * Delete an integration.
   *
   * @remarks
   * Removes the integration and its secrets; its endpoint answers 404 from then on, so remove the Action from the provider first. Requires the integrations scope. An unknown or already deleted integration answers 404.
   */
  async delete(
    request: operations.DeleteIntegrationRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteIntegrationResponse | undefined> {
    return unwrapAsync(integrationsDelete(
      this,
      request,
      options,
    ));
  }

  /**
   * Replace an integration's secret.
   *
   * @remarks
   * For Auth0, send {} and the answer's secret is the new shared secret, shown once. For WorkOS, regenerate the Actions secret in the WorkOS dashboard and send it as signing_secret. The replaced secret is still accepted for 24 hours (previous_secret_expires_at). Requires the integrations scope. Not idempotent: a retry after a lost answer rotates again.
   */
  async rotate(
    request: operations.RotateIntegrationSecretRequest,
    options?: RequestOptions,
  ): Promise<operations.RotateIntegrationSecretResponse> {
    return unwrapAsync(integrationsRotate(
      this,
      request,
      options,
    ));
  }
}
