import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListAuditStreamsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  environment: models.Environment;
};

export type ListAuditStreamsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AuditStreamList;
};

/** @internal */
export type ListAuditStreamsRequest$Outbound = {
  workspace_id: string;
  environment: string;
};

/** @internal */
export const ListAuditStreamsRequest$outboundSchema: z.ZodMiniType<
  ListAuditStreamsRequest$Outbound,
  ListAuditStreamsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.Environment$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function listAuditStreamsRequestToJSON(
  listAuditStreamsRequest: ListAuditStreamsRequest,
): string {
  return JSON.stringify(
    ListAuditStreamsRequest$outboundSchema.parse(listAuditStreamsRequest),
  );
}

/** @internal */
export const ListAuditStreamsResponse$inboundSchema: z.ZodMiniType<
  ListAuditStreamsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AuditStreamList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listAuditStreamsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListAuditStreamsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListAuditStreamsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListAuditStreamsResponse' from JSON`,
  );
}
