import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as discriminatedUnionTypes from "../types/discriminated-union.js";
import { discriminatedUnion } from "../types/discriminated-union.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AuditEventTarget,
  AuditEventTarget$inboundSchema,
  AuditEventTarget$Outbound,
  AuditEventTarget$outboundSchema,
} from "./audit-event-target.js";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$inboundSchema,
  AuditSettingsEnvironment$outboundSchema,
} from "./audit-settings-environment.js";
import {
  CustomerExportRequestFilterOutcome,
  CustomerExportRequestFilterOutcome$inboundSchema,
  CustomerExportRequestFilterOutcome$outboundSchema,
} from "./customer-export-request-filter-outcome.js";
import {
  Environment,
  Environment$inboundSchema,
  Environment$outboundSchema,
} from "./environment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  KeyActor,
  KeyActor$inboundSchema,
  KeyActor$Outbound,
  KeyActor$outboundSchema,
} from "./key-actor.js";
import {
  UserActor,
  UserActor$inboundSchema,
  UserActor$Outbound,
  UserActor$outboundSchema,
} from "./user-actor.js";

export type Actor =
  | UserActor
  | KeyActor
  | discriminatedUnionTypes.Unknown<"type">;

/**
 * One privileged workspace action with its actor, target, outcome and time. Successful data changes commit their audit evidence atomically. Sensitive exports record access before returning bytes. Details exclude secrets and subject identifiers.
 */
export type AuditEvent = {
  /**
   * Opaque, server-assigned event id: aud_ and a 26-character ULID.
   */
  id: string;
  /**
   * The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.
   */
  workspaceId: string;
  environment: AuditSettingsEnvironment;
  /**
   * What happened, as resource.verb: workspace.created, member.role_changed, member.removed, invite.created, invite.revoked, invite.accepted, key.rotated, webhook_endpoint.created, webhook_endpoint.deleted, webhook_endpoint.secret_rotated, integration.created, integration.deleted, integration.secret_rotated, list_entry.created, list_entry.deleted, webhook_endpoint.test_sent, webhook_endpoint.verification_requested, webhook_endpoint.delivery_replayed, assessment.created, assessment.outcome_recorded, assessment.deleted, account.outcome_recorded, account.enforcement_recorded, account.deleted, account.exported. A change with no finer name carries the permission it used, such as keys.live.write. New actions may appear; treat an unknown one as a change to its target.
   */
  action: string;
  outcome: CustomerExportRequestFilterOutcome;
  actor: UserActor | KeyActor | discriminatedUnionTypes.Unknown<"type">;
  target: AuditEventTarget;
  /**
   * At most 8 short facts about the change, keyed by lowercase names: the role a member was given or accepted (role), the invite an accepted member used (invite_id), the key that replaced a rotated one (new_key_id), the assessment a member's change acted on (assessment_id). Absent when there are none.
   */
  detail?: { [k: string]: string } | undefined;
  createdAt: string;
  affectedEnvironment?: Environment | undefined;
  /**
   * Validated request correlation id, also returned in X-Request-ID, linking this event to request diagnostics. Absent on historical events without correlation.
   */
  requestId?: string | undefined;
};

/** @internal */
export const Actor$inboundSchema: z.ZodMiniType<Actor, unknown> =
  discriminatedUnion("type", {
    user: UserActor$inboundSchema,
    api_key: KeyActor$inboundSchema,
  });
/** @internal */
export type Actor$Outbound = UserActor$Outbound | KeyActor$Outbound;

/** @internal */
export const Actor$outboundSchema: z.ZodMiniType<Actor$Outbound, Actor> = z
  .union([UserActor$outboundSchema, KeyActor$outboundSchema]);

export function actorToJSON(actor: Actor): string {
  return JSON.stringify(Actor$outboundSchema.parse(actor));
}
export function actorFromJSON(
  jsonString: string,
): SafeParseResult<Actor, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Actor$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Actor' from JSON`,
  );
}

/** @internal */
export const AuditEvent$inboundSchema: z.ZodMiniType<AuditEvent, unknown> = z
  .pipe(
    z.object({
      id: types.string(),
      workspace_id: types.string(),
      environment: AuditSettingsEnvironment$inboundSchema,
      action: types.string(),
      outcome: CustomerExportRequestFilterOutcome$inboundSchema,
      actor: discriminatedUnion("type", {
        user: UserActor$inboundSchema,
        api_key: KeyActor$inboundSchema,
      }),
      target: AuditEventTarget$inboundSchema,
      detail: types.optional(z.record(z.string(), types.string())),
      created_at: types.string(),
      affected_environment: types.optional(Environment$inboundSchema),
      request_id: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "workspace_id": "workspaceId",
        "created_at": "createdAt",
        "affected_environment": "affectedEnvironment",
        "request_id": "requestId",
      });
    }),
  );
/** @internal */
export type AuditEvent$Outbound = {
  id: string;
  workspace_id: string;
  environment: string;
  action: string;
  outcome: string;
  actor: UserActor$Outbound | KeyActor$Outbound;
  target: AuditEventTarget$Outbound;
  detail?: { [k: string]: string } | undefined;
  created_at: string;
  affected_environment?: string | undefined;
  request_id?: string | undefined;
};

/** @internal */
export const AuditEvent$outboundSchema: z.ZodMiniType<
  AuditEvent$Outbound,
  AuditEvent
> = z.pipe(
  z.object({
    id: z.string(),
    workspaceId: z.string(),
    environment: AuditSettingsEnvironment$outboundSchema,
    action: z.string(),
    outcome: CustomerExportRequestFilterOutcome$outboundSchema,
    actor: z.union([UserActor$outboundSchema, KeyActor$outboundSchema]),
    target: AuditEventTarget$outboundSchema,
    detail: z.optional(z.record(z.string(), z.string())),
    createdAt: z.string(),
    affectedEnvironment: z.optional(Environment$outboundSchema),
    requestId: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      createdAt: "created_at",
      affectedEnvironment: "affected_environment",
      requestId: "request_id",
    });
  }),
);

export function auditEventToJSON(auditEvent: AuditEvent): string {
  return JSON.stringify(AuditEvent$outboundSchema.parse(auditEvent));
}
export function auditEventFromJSON(
  jsonString: string,
): SafeParseResult<AuditEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AuditEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AuditEvent' from JSON`,
  );
}
