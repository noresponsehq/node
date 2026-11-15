import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type UpdateKeyAccessRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The key's id. A key of another workspace answers 404, as does a key of the other environment to an API key.
   */
  keyId: string;
  body: models.KeyAccessRequest;
};

export type UpdateKeyAccessResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Key;
};

/** @internal */
export type UpdateKeyAccessRequest$Outbound = {
  workspace_id: string;
  key_id: string;
  body: models.KeyAccessRequest$Outbound;
};

/** @internal */
export const UpdateKeyAccessRequest$outboundSchema: z.ZodMiniType<
  UpdateKeyAccessRequest$Outbound,
  UpdateKeyAccessRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    keyId: z.string(),
    body: models.KeyAccessRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      keyId: "key_id",
    });
  }),
);

export function updateKeyAccessRequestToJSON(
  updateKeyAccessRequest: UpdateKeyAccessRequest,
): string {
  return JSON.stringify(
    UpdateKeyAccessRequest$outboundSchema.parse(updateKeyAccessRequest),
  );
}

/** @internal */
export const UpdateKeyAccessResponse$inboundSchema: z.ZodMiniType<
  UpdateKeyAccessResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Key$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function updateKeyAccessResponseFromJSON(
  jsonString: string,
): SafeParseResult<UpdateKeyAccessResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UpdateKeyAccessResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UpdateKeyAccessResponse' from JSON`,
  );
}
