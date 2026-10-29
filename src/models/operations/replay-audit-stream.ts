import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ReplayAuditStreamRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  environment: models.Environment;
  endpointId: string;
  body: models.AuditStreamReplayRequest;
};

export type ReplayAuditStreamResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AuditStreamList;
};

/** @internal */
export type ReplayAuditStreamRequest$Outbound = {
  workspace_id: string;
  environment: string;
  endpoint_id: string;
  body: models.AuditStreamReplayRequest$Outbound;
};

/** @internal */
export const ReplayAuditStreamRequest$outboundSchema: z.ZodMiniType<
  ReplayAuditStreamRequest$Outbound,
  ReplayAuditStreamRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.Environment$outboundSchema,
    endpointId: z.string(),
    body: models.AuditStreamReplayRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      endpointId: "endpoint_id",
    });
  }),
);

export function replayAuditStreamRequestToJSON(
  replayAuditStreamRequest: ReplayAuditStreamRequest,
): string {
  return JSON.stringify(
    ReplayAuditStreamRequest$outboundSchema.parse(replayAuditStreamRequest),
  );
}

/** @internal */
export const ReplayAuditStreamResponse$inboundSchema: z.ZodMiniType<
  ReplayAuditStreamResponse,
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

export function replayAuditStreamResponseFromJSON(
  jsonString: string,
): SafeParseResult<ReplayAuditStreamResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReplayAuditStreamResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReplayAuditStreamResponse' from JSON`,
  );
}
