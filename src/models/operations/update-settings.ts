import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type UpdateSettingsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  body: models.SettingsRequest;
};

export type UpdateSettingsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Settings;
};

/** @internal */
export type UpdateSettingsRequest$Outbound = {
  workspace_id: string;
  environment: string;
  body: models.SettingsRequest$Outbound;
};

/** @internal */
export const UpdateSettingsRequest$outboundSchema: z.ZodMiniType<
  UpdateSettingsRequest$Outbound,
  UpdateSettingsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    body: models.SettingsRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function updateSettingsRequestToJSON(
  updateSettingsRequest: UpdateSettingsRequest,
): string {
  return JSON.stringify(
    UpdateSettingsRequest$outboundSchema.parse(updateSettingsRequest),
  );
}

/** @internal */
export const UpdateSettingsResponse$inboundSchema: z.ZodMiniType<
  UpdateSettingsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Settings$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function updateSettingsResponseFromJSON(
  jsonString: string,
): SafeParseResult<UpdateSettingsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UpdateSettingsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UpdateSettingsResponse' from JSON`,
  );
}
