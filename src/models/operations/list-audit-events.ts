import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListAuditEventsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * Events per page.
   */
  limit?: number | undefined;
  /**
   * next_cursor from the previous page, unchanged; keep every filter unchanged.
   */
  cursor?: string | undefined;
  /**
   * Affected scope. API keys can request only their own environment. Omit to read the scopes the caller is allowed.
   */
  environment?: models.Environment | undefined;
  /**
   * Exact action, such as key.created or account.deleted.
   */
  action?: string | undefined;
  /**
   * Exact external user id, public API key id or console credential id.
   */
  actor?: string | undefined;
  /**
   * Exact target kind, such as key, member, setting or workspace.
   */
  targetType?: string | undefined;
  /**
   * Public target identifier. Audit targets exclude subject identifiers.
   */
  targetId?: string | undefined;
  /**
   * Exact outcome.
   */
  outcome?: models.CustomerExportRequestFilterOutcome | undefined;
  /**
   * Inclusive creation timestamp in RFC3339 format.
   */
  since?: string | undefined;
  /**
   * Exclusive creation timestamp in RFC3339 format; must follow since when both are supplied.
   */
  until?: string | undefined;
};

export type ListAuditEventsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AuditEventList;
};

/** @internal */
export type ListAuditEventsRequest$Outbound = {
  workspace_id: string;
  limit: number;
  cursor?: string | undefined;
  environment?: string | undefined;
  action?: string | undefined;
  actor?: string | undefined;
  target_type?: string | undefined;
  target_id?: string | undefined;
  outcome?: string | undefined;
  since?: string | undefined;
  until?: string | undefined;
};

/** @internal */
export const ListAuditEventsRequest$outboundSchema: z.ZodMiniType<
  ListAuditEventsRequest$Outbound,
  ListAuditEventsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    limit: z._default(z.int(), 20),
    cursor: z.optional(z.string()),
    environment: z.optional(models.Environment$outboundSchema),
    action: z.optional(z.string()),
    actor: z.optional(z.string()),
    targetType: z.optional(z.string()),
    targetId: z.optional(z.string()),
    outcome: z.optional(
      models.CustomerExportRequestFilterOutcome$outboundSchema,
    ),
    since: z.optional(z.string()),
    until: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      targetType: "target_type",
      targetId: "target_id",
    });
  }),
);

export function listAuditEventsRequestToJSON(
  listAuditEventsRequest: ListAuditEventsRequest,
): string {
  return JSON.stringify(
    ListAuditEventsRequest$outboundSchema.parse(listAuditEventsRequest),
  );
}

/** @internal */
export const ListAuditEventsResponse$inboundSchema: z.ZodMiniType<
  ListAuditEventsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AuditEventList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listAuditEventsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListAuditEventsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListAuditEventsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListAuditEventsResponse' from JSON`,
  );
}
