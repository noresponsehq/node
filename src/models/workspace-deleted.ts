import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$inboundSchema,
  AuditSettingsEnvironment$outboundSchema,
} from "./audit-settings-environment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Terminal for the receiving endpoint's environment: its workspace was deleted. Every key of the environment already answers 401, its assessments and accounts are gone, and no further event follows. The workspace id is not reused, so a later event naming it cannot arrive.
 */
export type WorkspaceDeleted = {
  /**
   * The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.
   */
  workspaceId: string;
  environment: AuditSettingsEnvironment;
  /**
   * When the deletion took effect, equal to deleted_at in the DELETE answer.
   */
  deletedAt: string;
};

/** @internal */
export const WorkspaceDeleted$inboundSchema: z.ZodMiniType<
  WorkspaceDeleted,
  unknown
> = z.pipe(
  z.object({
    workspace_id: types.string(),
    environment: AuditSettingsEnvironment$inboundSchema,
    deleted_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "workspace_id": "workspaceId",
      "deleted_at": "deletedAt",
    });
  }),
);
/** @internal */
export type WorkspaceDeleted$Outbound = {
  workspace_id: string;
  environment: string;
  deleted_at: string;
};

/** @internal */
export const WorkspaceDeleted$outboundSchema: z.ZodMiniType<
  WorkspaceDeleted$Outbound,
  WorkspaceDeleted
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: AuditSettingsEnvironment$outboundSchema,
    deletedAt: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      deletedAt: "deleted_at",
    });
  }),
);

export function workspaceDeletedToJSON(
  workspaceDeleted: WorkspaceDeleted,
): string {
  return JSON.stringify(
    WorkspaceDeleted$outboundSchema.parse(workspaceDeleted),
  );
}
export function workspaceDeletedFromJSON(
  jsonString: string,
): SafeParseResult<WorkspaceDeleted, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkspaceDeleted$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkspaceDeleted' from JSON`,
  );
}
