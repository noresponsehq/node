import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AuditEventTargetType,
  AuditEventTargetType$inboundSchema,
  AuditEventTargetType$outboundSchema,
} from "./audit-event-target-type.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AuditEventTarget = {
  /**
   * The kind of resource the change acted on.
   */
  type: AuditEventTargetType;
  /**
   * The resource's id, when it has one.
   */
  id?: string | undefined;
};

/** @internal */
export const AuditEventTarget$inboundSchema: z.ZodMiniType<
  AuditEventTarget,
  unknown
> = z.object({
  type: AuditEventTargetType$inboundSchema,
  id: types.optional(types.string()),
});
/** @internal */
export type AuditEventTarget$Outbound = {
  type: string;
  id?: string | undefined;
};

/** @internal */
export const AuditEventTarget$outboundSchema: z.ZodMiniType<
  AuditEventTarget$Outbound,
  AuditEventTarget
> = z.object({
  type: AuditEventTargetType$outboundSchema,
  id: z.optional(z.string()),
});

export function auditEventTargetToJSON(
  auditEventTarget: AuditEventTarget,
): string {
  return JSON.stringify(
    AuditEventTarget$outboundSchema.parse(auditEventTarget),
  );
}
export function auditEventTargetFromJSON(
  jsonString: string,
): SafeParseResult<AuditEventTarget, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AuditEventTarget$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AuditEventTarget' from JSON`,
  );
}
