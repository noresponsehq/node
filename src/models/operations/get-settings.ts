import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetSettingsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
};

export type GetSettingsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Settings;
};

/** @internal */
export type GetSettingsRequest$Outbound = {
  workspace_id: string;
  environment: string;
};

/** @internal */
export const GetSettingsRequest$outboundSchema: z.ZodMiniType<
  GetSettingsRequest$Outbound,
  GetSettingsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function getSettingsRequestToJSON(
  getSettingsRequest: GetSettingsRequest,
): string {
  return JSON.stringify(
    GetSettingsRequest$outboundSchema.parse(getSettingsRequest),
  );
}

/** @internal */
export const GetSettingsResponse$inboundSchema: z.ZodMiniType<
  GetSettingsResponse,
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

export function getSettingsResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetSettingsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetSettingsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetSettingsResponse' from JSON`,
  );
}
