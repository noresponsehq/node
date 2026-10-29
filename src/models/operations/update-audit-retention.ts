import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export const Environment = {
  Test: "test",
} as const;
export type Environment = ClosedEnum<typeof Environment>;

export type UpdateAuditRetentionRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  environment: Environment;
  body: models.AuditSettingsRequest;
};

export type UpdateAuditRetentionResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AuditSettings;
};

/** @internal */
export const Environment$outboundSchema: z.ZodMiniEnum<typeof Environment> = z
  .enum(Environment);

/** @internal */
export type UpdateAuditRetentionRequest$Outbound = {
  workspace_id: string;
  environment: string;
  body: models.AuditSettingsRequest$Outbound;
};

/** @internal */
export const UpdateAuditRetentionRequest$outboundSchema: z.ZodMiniType<
  UpdateAuditRetentionRequest$Outbound,
  UpdateAuditRetentionRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: Environment$outboundSchema,
    body: models.AuditSettingsRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function updateAuditRetentionRequestToJSON(
  updateAuditRetentionRequest: UpdateAuditRetentionRequest,
): string {
  return JSON.stringify(
    UpdateAuditRetentionRequest$outboundSchema.parse(
      updateAuditRetentionRequest,
    ),
  );
}

/** @internal */
export const UpdateAuditRetentionResponse$inboundSchema: z.ZodMiniType<
  UpdateAuditRetentionResponse,
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

export function updateAuditRetentionResponseFromJSON(
  jsonString: string,
): SafeParseResult<UpdateAuditRetentionResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UpdateAuditRetentionResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UpdateAuditRetentionResponse' from JSON`,
  );
}
