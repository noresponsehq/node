import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateKeyRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  body: models.KeyRequest;
};

export type CreateKeyResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Key;
};

/** @internal */
export type CreateKeyRequest$Outbound = {
  workspace_id: string;
  body: models.KeyRequest$Outbound;
};

/** @internal */
export const CreateKeyRequest$outboundSchema: z.ZodMiniType<
  CreateKeyRequest$Outbound,
  CreateKeyRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    body: models.KeyRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function createKeyRequestToJSON(
  createKeyRequest: CreateKeyRequest,
): string {
  return JSON.stringify(
    CreateKeyRequest$outboundSchema.parse(createKeyRequest),
  );
}

/** @internal */
export const CreateKeyResponse$inboundSchema: z.ZodMiniType<
  CreateKeyResponse,
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

export function createKeyResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateKeyResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateKeyResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateKeyResponse' from JSON`,
  );
}
