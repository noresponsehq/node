import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetAuditRetentionRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  environment: models.AuditSettingsEnvironment;
};

export type GetAuditRetentionResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AuditSettings;
};

/** @internal */
export type GetAuditRetentionRequest$Outbound = {
  workspace_id: string;
  environment: string;
};

/** @internal */
export const GetAuditRetentionRequest$outboundSchema: z.ZodMiniType<
  GetAuditRetentionRequest$Outbound,
  GetAuditRetentionRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.AuditSettingsEnvironment$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function getAuditRetentionRequestToJSON(
  getAuditRetentionRequest: GetAuditRetentionRequest,
): string {
  return JSON.stringify(
    GetAuditRetentionRequest$outboundSchema.parse(getAuditRetentionRequest),
  );
}

/** @internal */
export const GetAuditRetentionResponse$inboundSchema: z.ZodMiniType<
  GetAuditRetentionResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AuditSettings$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getAuditRetentionResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetAuditRetentionResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetAuditRetentionResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetAuditRetentionResponse' from JSON`,
  );
}
