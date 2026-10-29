import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RemoveAuditStreamRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  environment: models.Environment;
  endpointId: string;
};

export type RemoveAuditStreamResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AuditStreamList;
};

/** @internal */
export type RemoveAuditStreamRequest$Outbound = {
  workspace_id: string;
  environment: string;
  endpoint_id: string;
};

/** @internal */
export const RemoveAuditStreamRequest$outboundSchema: z.ZodMiniType<
  RemoveAuditStreamRequest$Outbound,
  RemoveAuditStreamRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.Environment$outboundSchema,
    endpointId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      endpointId: "endpoint_id",
    });
  }),
);

export function removeAuditStreamRequestToJSON(
  removeAuditStreamRequest: RemoveAuditStreamRequest,
): string {
  return JSON.stringify(
    RemoveAuditStreamRequest$outboundSchema.parse(removeAuditStreamRequest),
  );
}

/** @internal */
export const RemoveAuditStreamResponse$inboundSchema: z.ZodMiniType<
  RemoveAuditStreamResponse,
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

export function removeAuditStreamResponseFromJSON(
  jsonString: string,
): SafeParseResult<RemoveAuditStreamResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RemoveAuditStreamResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RemoveAuditStreamResponse' from JSON`,
  );
}
