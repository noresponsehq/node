import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { AuditEvent, AuditEvent$inboundSchema } from "./audit-event.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * GET /v1/workspaces/{workspace_id}/audit_events: one page of the workspace's audit log, both environments, newest first. Events are kept for as long as the workspace exists and are deleted with it. next_cursor is present only when another page exists.
 */
export type AuditEventList = {
  /**
   * The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.
   */
  workspaceId: string;
  items: Array<AuditEvent>;
  /**
   * Opaque cursor for the next page, MAC'd by the server and bound to the workspace it was issued for. Pass it back unchanged as cursor; a tampered, foreign or expired cursor answers 400 invalid_cursor.
   */
  nextCursor?: string | undefined;
};

/** @internal */
export const AuditEventList$inboundSchema: z.ZodMiniType<
  AuditEventList,
  unknown
> = z.pipe(
  z.object({
    workspace_id: types.string(),
    items: z.array(AuditEvent$inboundSchema),
    next_cursor: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "workspace_id": "workspaceId",
      "next_cursor": "nextCursor",
    });
  }),
);

export function auditEventListFromJSON(
  jsonString: string,
): SafeParseResult<AuditEventList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AuditEventList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AuditEventList' from JSON`,
  );
}
