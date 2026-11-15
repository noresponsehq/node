import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateWorkspacePersonRequest = {
  /**
   * Opaque request key, 16 to 128 characters. Repeating the key and request returns the same resource in its current state while it is retained. A different request with the same key answers 409. Use a new key for a deliberate new operation. Keys are scoped to the environment and operation; person searches also scope them to the group and person.
   */
  idempotencyKey?: string | undefined;
  body: models.WorkspacePersonRequest;
};

export type CreateWorkspacePersonResponse = {
  headers: { [k: string]: Array<string> };
  result: models.WorkspacePersonResult;
};

/** @internal */
export type CreateWorkspacePersonRequest$Outbound = {
  "Idempotency-Key"?: string | undefined;
  body: models.WorkspacePersonRequest$Outbound;
};

/** @internal */
export const CreateWorkspacePersonRequest$outboundSchema: z.ZodMiniType<
  CreateWorkspacePersonRequest$Outbound,
  CreateWorkspacePersonRequest
> = z.pipe(
  z.object({
    idempotencyKey: z.optional(z.string()),
    body: models.WorkspacePersonRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function createWorkspacePersonRequestToJSON(
  createWorkspacePersonRequest: CreateWorkspacePersonRequest,
): string {
  return JSON.stringify(
    CreateWorkspacePersonRequest$outboundSchema.parse(
      createWorkspacePersonRequest,
    ),
  );
}

/** @internal */
export const CreateWorkspacePersonResponse$inboundSchema: z.ZodMiniType<
  CreateWorkspacePersonResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.WorkspacePersonResult$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function createWorkspacePersonResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateWorkspacePersonResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateWorkspacePersonResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateWorkspacePersonResponse' from JSON`,
  );
}
