import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RevokeKeyRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The key's id. A key of another workspace answers 404, as does a key of the other environment to an API key.
   */
  keyId: string;
};

export type RevokeKeyResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Key;
};

/** @internal */
export type RevokeKeyRequest$Outbound = {
  workspace_id: string;
  key_id: string;
};

/** @internal */
export const RevokeKeyRequest$outboundSchema: z.ZodMiniType<
  RevokeKeyRequest$Outbound,
  RevokeKeyRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    keyId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      keyId: "key_id",
    });
  }),
);

export function revokeKeyRequestToJSON(
  revokeKeyRequest: RevokeKeyRequest,
): string {
  return JSON.stringify(
    RevokeKeyRequest$outboundSchema.parse(revokeKeyRequest),
  );
}

/** @internal */
export const RevokeKeyResponse$inboundSchema: z.ZodMiniType<
  RevokeKeyResponse,
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

export function revokeKeyResponseFromJSON(
  jsonString: string,
): SafeParseResult<RevokeKeyResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RevokeKeyResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RevokeKeyResponse' from JSON`,
  );
}
