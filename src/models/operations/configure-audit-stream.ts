import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ConfigureAuditStreamRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  environment: models.Environment;
  body: models.AuditStreamRequest;
};

export type ConfigureAuditStreamResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AuditStreamList;
};

/** @internal */
export type ConfigureAuditStreamRequest$Outbound = {
  workspace_id: string;
  environment: string;
  body: models.AuditStreamRequest$Outbound;
};

/** @internal */
export const ConfigureAuditStreamRequest$outboundSchema: z.ZodMiniType<
  ConfigureAuditStreamRequest$Outbound,
  ConfigureAuditStreamRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.Environment$outboundSchema,
    body: models.AuditStreamRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function configureAuditStreamRequestToJSON(
  configureAuditStreamRequest: ConfigureAuditStreamRequest,
): string {
  return JSON.stringify(
    ConfigureAuditStreamRequest$outboundSchema.parse(
      configureAuditStreamRequest,
    ),
  );
}

/** @internal */
export const ConfigureAuditStreamResponse$inboundSchema: z.ZodMiniType<
  ConfigureAuditStreamResponse,
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

export function configureAuditStreamResponseFromJSON(
  jsonString: string,
): SafeParseResult<ConfigureAuditStreamResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ConfigureAuditStreamResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ConfigureAuditStreamResponse' from JSON`,
  );
}
