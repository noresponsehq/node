import { auditConfigureStream } from "../funcs/audit-configure-stream.js";
import { auditGetRetention } from "../funcs/audit-get-retention.js";
import { auditListStreams } from "../funcs/audit-list-streams.js";
import { auditList } from "../funcs/audit-list.js";
import { auditRemoveStream } from "../funcs/audit-remove-stream.js";
import { auditReplayStream } from "../funcs/audit-replay-stream.js";
import { auditUpdateRetention } from "../funcs/audit-update-retention.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { PageIterator, unwrapResultIterator } from "../types/operations.js";

export class Audit extends ClientSDK {
  /**
   * List a workspace's audit log.
   *
   * @remarks
   * Read audit events within your current environment permissions. Filters apply before pagination.
   */
  async list(
    request: operations.ListAuditEventsRequest,
    options?: RequestOptions,
  ): Promise<
    PageIterator<operations.ListAuditEventsResponse, { cursor: string }>
  > {
    return unwrapResultIterator(auditList(
      this,
      request,
      options,
    ));
  }

  /**
   * Read audit retention and available history.
   *
   * @remarks
   * Read audit retention for the environment. The default is 365 days. Oldest available is an observation; it does not establish uninterrupted capture. Workspace-wide events follow the live storage policy.
   */
  async getRetention(
    request: operations.GetAuditRetentionRequest,
    options?: RequestOptions,
  ): Promise<operations.GetAuditRetentionResponse> {
    return unwrapAsync(auditGetRetention(
      this,
      request,
      options,
    ));
  }

  /**
   * Set bounded customer audit retention.
   *
   * @remarks
   * Set test-environment audit retention from 1 to 365 days with audit_manage scope. Live retention also governs workspace-wide audit events and requires a dashboard member authorised in both environments. Shortening immediately hides older events and invalidates audit exports; extending cannot restore deleted events. External receivers control copies already delivered.
   */
  async updateRetention(
    request: operations.UpdateAuditRetentionRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateAuditRetentionResponse> {
    return unwrapAsync(auditUpdateRetention(
      this,
      request,
      options,
    ));
  }

  /**
   * Read audit stream subscriptions.
   *
   * @remarks
   * List audit subscriptions and their endpoint state and latest delivery attempt. Streams use verified HTTPS webhook endpoints and signed audit.event bodies. Delivery is at least once and unordered; deduplicate by webhook id. An empty action filter accepts all actions within the chosen scope.
   */
  async listStreams(
    request: operations.ListAuditStreamsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListAuditStreamsResponse> {
    return unwrapAsync(auditListStreams(
      this,
      request,
      options,
    ));
  }

  /**
   * Configure an audit stream subscription.
   *
   * @remarks
   * Configure the action filter for one verified webhook endpoint. Requires audit_manage. Capture starts at subscription creation; use an audit export for available earlier events. Workspace-wide scope requires an unrestricted console member and is unavailable to API keys.
   */
  async configureStream(
    request: operations.ConfigureAuditStreamRequest,
    options?: RequestOptions,
  ): Promise<operations.ConfigureAuditStreamResponse> {
    return unwrapAsync(auditConfigureStream(
      this,
      request,
      options,
    ));
  }

  /**
   * Remove an audit stream.
   *
   * @remarks
   * Remove an audit subscription and cancel queued deliveries. Requires audit_manage. An HTTP delivery already in flight cannot be recalled. The endpoint remains registered for other event types.
   */
  async removeStream(
    request: operations.RemoveAuditStreamRequest,
    options?: RequestOptions,
  ): Promise<operations.RemoveAuditStreamResponse> {
    return unwrapAsync(auditRemoveStream(
      this,
      request,
      options,
    ));
  }

  /**
   * Replay an audit delivery.
   *
   * @remarks
   * Replay a recorded delivery for the current audit subscription. Requires audit_manage. Source retention and the current action filter are checked again before sending. Expired or unsubscribed events are dropped.
   */
  async replayStream(
    request: operations.ReplayAuditStreamRequest,
    options?: RequestOptions,
  ): Promise<operations.ReplayAuditStreamResponse> {
    return unwrapAsync(auditReplayStream(
      this,
      request,
      options,
    ));
  }
}
