import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  WorkspaceDeleted,
  WorkspaceDeleted$inboundSchema,
  WorkspaceDeleted$Outbound,
  WorkspaceDeleted$outboundSchema,
} from "./workspace-deleted.js";

/**
 * The workspace.deleted event.
 */
export type WorkspaceDeletedEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always workspace.deleted.
   */
  type: "workspace.deleted";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  /**
   * Terminal for the receiving endpoint's environment: its workspace was deleted. Every key of the environment already answers 401, its assessments and accounts are gone, and no further event follows. The workspace id is not reused, so a later event naming it cannot arrive.
   */
  data: WorkspaceDeleted;
};

/** @internal */
export const WorkspaceDeletedEvent$inboundSchema: z.ZodMiniType<
  WorkspaceDeletedEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("workspace.deleted"),
    test: types.optional(types.boolean()),
    data: WorkspaceDeleted$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type WorkspaceDeletedEvent$Outbound = {
  id: string;
  created_at: string;
  type: "workspace.deleted";
  test?: boolean | undefined;
  data: WorkspaceDeleted$Outbound;
};

/** @internal */
export const WorkspaceDeletedEvent$outboundSchema: z.ZodMiniType<
  WorkspaceDeletedEvent$Outbound,
  WorkspaceDeletedEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("workspace.deleted"),
    test: z.optional(z.boolean()),
    data: WorkspaceDeleted$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function workspaceDeletedEventToJSON(
  workspaceDeletedEvent: WorkspaceDeletedEvent,
): string {
  return JSON.stringify(
    WorkspaceDeletedEvent$outboundSchema.parse(workspaceDeletedEvent),
  );
}
export function workspaceDeletedEventFromJSON(
  jsonString: string,
): SafeParseResult<WorkspaceDeletedEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkspaceDeletedEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkspaceDeletedEvent' from JSON`,
  );
}
