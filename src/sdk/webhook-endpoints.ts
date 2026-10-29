import { webhookEndpointsAggregate } from "../funcs/webhook-endpoints-aggregate.js";
import { webhookEndpointsCreate } from "../funcs/webhook-endpoints-create.js";
import { webhookEndpointsDelete } from "../funcs/webhook-endpoints-delete.js";
import { webhookEndpointsListDeliveries } from "../funcs/webhook-endpoints-list-deliveries.js";
import { webhookEndpointsList } from "../funcs/webhook-endpoints-list.js";
import { webhookEndpointsReplayDelivery } from "../funcs/webhook-endpoints-replay-delivery.js";
import { webhookEndpointsRotateSigningKey } from "../funcs/webhook-endpoints-rotate-signing-key.js";
import { webhookEndpointsSendTestEvent } from "../funcs/webhook-endpoints-send-test-event.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { PageIterator, unwrapResultIterator } from "../types/operations.js";

export class WebhookEndpoints extends ClientSDK {
  /**
   * List the workspace's webhook endpoints.
   *
   * @remarks
   * Lists your webhook endpoints in every state, ordered by endpoint_id, with the ids of their signing keys and without secrets. Requires the webhooks scope.
   */
  async list(
    options?: RequestOptions,
  ): Promise<operations.ListWebhookEndpointsResponse> {
    return unwrapAsync(webhookEndpointsList(
      this,
      options,
    ));
  }

  /**
   * Register a webhook endpoint.
   *
   * @remarks
   * Registers a webhook endpoint and returns it with its first signing secret, shown only in this answer: store it where your receiver reads it. The URL is https on port 443 or 8443 with a DNS host whose every address is public; it is checked now and on every delivery. The endpoint starts unverified and receives assessment events once it echoes an endpoint.verification challenge, which sendTestEvent sends. You can hold 5 endpoints. Requires the webhooks scope, and response_mode detailed also the detailed scope. Registration is not idempotent: a retry after a lost answer registers a second endpoint, which you can list and delete.
   */
  async create(
    request: models.WebhookEndpointRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateWebhookEndpointResponse> {
    return unwrapAsync(webhookEndpointsCreate(
      this,
      request,
      options,
    ));
  }

  /**
   * Delete a webhook endpoint.
   *
   * @remarks
   * Deletes the endpoint and its signing keys. Deliveries still queued for it are dropped. Requires the webhooks scope. An endpoint that is already gone answers 404.
   */
  async delete(
    request: operations.DeleteWebhookEndpointRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteWebhookEndpointResponse | undefined> {
    return unwrapAsync(webhookEndpointsDelete(
      this,
      request,
      options,
    ));
  }

  /**
   * Rotate an endpoint's signing key.
   *
   * @remarks
   * Issues a new signing key for the endpoint and returns its secret once. Every delivery from now on is signed with it; the key it replaces keeps verifying for 7 days, so your receiver can hold both while it switches. Requires the webhooks scope. Rotation is not idempotent: a retry after a lost answer issues another key, which replaces the first.
   */
  async rotateSigningKey(
    request: operations.RotateWebhookSigningKeyRequest,
    options?: RequestOptions,
  ): Promise<operations.RotateWebhookSigningKeyResponse> {
    return unwrapAsync(webhookEndpointsRotateSigningKey(
      this,
      request,
      options,
    ));
  }

  /**
   * Send a test event to an endpoint.
   *
   * @remarks
   * endpoint.verification sends a signed challenge now and answers whether the endpoint echoed it within 5 seconds; an echo verifies the endpoint, including a disabled one. assessment.updated queues one signed event with test: true and a fixed example assessment in the endpoint's response mode, delivered and retried like any other event; the endpoint must be verified. Both use the endpoint's current signing key. Requires the webhooks scope.
   */
  async sendTestEvent(
    request: operations.SendWebhookTestEventRequest,
    options?: RequestOptions,
  ): Promise<operations.SendWebhookTestEventResponse> {
    return unwrapAsync(webhookEndpointsSendTestEvent(
      this,
      request,
      options,
    ));
  }

  /**
   * List an endpoint's delivery attempts.
   *
   * @remarks
   * Every POST the endpoint received, newest first: the event id and type, which attempt it was, whether it was a replay, delivered or failed, the response code, why it failed and how long it took. Attempts are kept for 30 days, or your retention_days when that is shorter, and are deleted with the assessment they carried. Requires the webhooks scope. Read-only and safe to retry. The cursor is opaque and bound to your workspace and the endpoint; a tampered or expired cursor answers 400 invalid_cursor.
   */
  async listDeliveries(
    request: operations.ListWebhookDeliveriesRequest,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.ListWebhookDeliveriesResponse, { cursor: string }>
  > {
    return unwrapResultIterator(webhookEndpointsListDeliveries(
      this,
      request,
      options,
    ));
  }

  /**
   * Send one delivery again.
   *
   * @remarks
   * Queues the event for the endpoint again: the same event id and body it received, with a new NR-Webhook-Timestamp and a signature from the endpoint's current signing key, retried like any other delivery and listed with replay: true. Your receiver deduplicates on the event id. The endpoint must be verified. Requires the webhooks scope. Not idempotent: each call, a retry included, sends the event again.
   */
  async replayDelivery(
    request: operations.ReplayWebhookDeliveryRequest,
    options?: RequestOptions,
  ): Promise<operations.ReplayWebhookDeliveryResponse> {
    return unwrapAsync(webhookEndpointsReplayDelivery(
      this,
      request,
      options,
    ));
  }

  /**
   * Summarise retained webhook attempts and delivery queue
   *
   * @remarks
   * Count retained webhook delivery attempts within thirty days and report current retained queue state.
   */
  async aggregate(
    request: models.WebhookAggregateRequest,
    options?: RequestOptions,
  ): Promise<operations.AggregateWebhooksResponse> {
    return unwrapAsync(webhookEndpointsAggregate(
      this,
      request,
      options,
    ));
  }
}
