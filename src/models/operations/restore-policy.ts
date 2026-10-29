import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RestorePolicyRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  body: models.PolicyRestoreRequest;
};

export type RestorePolicyResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Settings;
};

/** @internal */
export type RestorePolicyRequest$Outbound = {
  workspace_id: string;
  environment: string;
  body: models.PolicyRestoreRequest$Outbound;
};

/** @internal */
export const RestorePolicyRequest$outboundSchema: z.ZodMiniType<
  RestorePolicyRequest$Outbound,
  RestorePolicyRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    body: models.PolicyRestoreRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function restorePolicyRequestToJSON(
  restorePolicyRequest: RestorePolicyRequest,
): string {
  return JSON.stringify(
    RestorePolicyRequest$outboundSchema.parse(restorePolicyRequest),
  );
}

/** @internal */
export const RestorePolicyResponse$inboundSchema: z.ZodMiniType<
  RestorePolicyResponse,
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

export function restorePolicyResponseFromJSON(
  jsonString: string,
): SafeParseResult<RestorePolicyResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RestorePolicyResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RestorePolicyResponse' from JSON`,
  );
}
