import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import {
  AccountDeletedEvent,
  AccountDeletedEvent$inboundSchema,
  AccountDeletedEvent$Outbound,
  AccountDeletedEvent$outboundSchema,
} from "./account-deleted-event.js";
import {
  AccountRiskChangedEvent,
  AccountRiskChangedEvent$inboundSchema,
  AccountRiskChangedEvent$Outbound,
  AccountRiskChangedEvent$outboundSchema,
} from "./account-risk-changed-event.js";
import {
  AssessmentUpdatedEvent,
  AssessmentUpdatedEvent$inboundSchema,
  AssessmentUpdatedEvent$Outbound,
  AssessmentUpdatedEvent$outboundSchema,
} from "./assessment-updated-event.js";
import {
  EndpointVerificationEvent,
  EndpointVerificationEvent$inboundSchema,
  EndpointVerificationEvent$Outbound,
  EndpointVerificationEvent$outboundSchema,
} from "./endpoint-verification-event.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  WebhookEndpointDisabledEvent,
  WebhookEndpointDisabledEvent$inboundSchema,
  WebhookEndpointDisabledEvent$Outbound,
  WebhookEndpointDisabledEvent$outboundSchema,
} from "./webhook-endpoint-disabled-event.js";
import {
  WorkspaceDeletedEvent,
  WorkspaceDeletedEvent$inboundSchema,
  WorkspaceDeletedEvent$Outbound,
  WorkspaceDeletedEvent$outboundSchema,
} from "./workspace-deleted-event.js";

/**
 * The body of every webhook delivery: {id, type, created_at, data}, where type chooses the shape of data. Deliveries are at least once and unordered: deduplicate on id, and keep an assessment only when its detail.assessment_version is newer than the one you hold. GET /v1/assessments/{assessment_id} stays authoritative.
 */
export type WebhookEvent =
  | AssessmentUpdatedEvent
  | EndpointVerificationEvent
  | AccountDeletedEvent
  | WorkspaceDeletedEvent
  | WebhookEndpointDisabledEvent
  | AccountRiskChangedEvent;

/** @internal */
export const WebhookEvent$inboundSchema: z.ZodMiniType<WebhookEvent, unknown> =
  z.union([
    AssessmentUpdatedEvent$inboundSchema,
    EndpointVerificationEvent$inboundSchema,
    AccountDeletedEvent$inboundSchema,
    WorkspaceDeletedEvent$inboundSchema,
    WebhookEndpointDisabledEvent$inboundSchema,
    AccountRiskChangedEvent$inboundSchema,
  ]);
/** @internal */
export type WebhookEvent$Outbound =
  | AssessmentUpdatedEvent$Outbound
  | EndpointVerificationEvent$Outbound
  | AccountDeletedEvent$Outbound
  | WorkspaceDeletedEvent$Outbound
  | WebhookEndpointDisabledEvent$Outbound
  | AccountRiskChangedEvent$Outbound;

/** @internal */
export const WebhookEvent$outboundSchema: z.ZodMiniType<
  WebhookEvent$Outbound,
  WebhookEvent
> = z.union([
  AssessmentUpdatedEvent$outboundSchema,
  EndpointVerificationEvent$outboundSchema,
  AccountDeletedEvent$outboundSchema,
  WorkspaceDeletedEvent$outboundSchema,
  WebhookEndpointDisabledEvent$outboundSchema,
  AccountRiskChangedEvent$outboundSchema,
]);

export function webhookEventToJSON(webhookEvent: WebhookEvent): string {
  return JSON.stringify(WebhookEvent$outboundSchema.parse(webhookEvent));
}
export function webhookEventFromJSON(
  jsonString: string,
): SafeParseResult<WebhookEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebhookEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebhookEvent' from JSON`,
  );
}
