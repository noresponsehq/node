import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AuditEvent,
  AuditEvent$inboundSchema,
  AuditEvent$Outbound,
  AuditEvent$outboundSchema,
} from "./audit-event.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The audit.event event.
 */
export type AuditEventEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always audit.event.
   */
  type: "audit.event";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  /**
   * One privileged workspace action with its actor, target, outcome and time. Successful data changes commit their audit evidence atomically. Sensitive exports record access before returning bytes. Details exclude secrets and subject identifiers.
   */
  data: AuditEvent;
};

/** @internal */
export const AuditEventEvent$inboundSchema: z.ZodMiniType<
  AuditEventEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("audit.event"),
    test: types.optional(types.boolean()),
    data: AuditEvent$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type AuditEventEvent$Outbound = {
  id: string;
  created_at: string;
  type: "audit.event";
  test?: boolean | undefined;
  data: AuditEvent$Outbound;
};

/** @internal */
export const AuditEventEvent$outboundSchema: z.ZodMiniType<
  AuditEventEvent$Outbound,
  AuditEventEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("audit.event"),
    test: z.optional(z.boolean()),
    data: AuditEvent$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function auditEventEventToJSON(
  auditEventEvent: AuditEventEvent,
): string {
  return JSON.stringify(AuditEventEvent$outboundSchema.parse(auditEventEvent));
}
export function auditEventEventFromJSON(
  jsonString: string,
): SafeParseResult<AuditEventEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AuditEventEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AuditEventEvent' from JSON`,
  );
}
