import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateGroupRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  /**
   * Opaque request key, 16 to 128 characters. Repeating the key and request returns the same resource in its current state while it is retained. A different request with the same key answers 409. Use a new key for a deliberate new operation. Keys are scoped to the environment and operation; person searches also scope them to the group and person.
   */
  idempotencyKey?: string | undefined;
  body: models.GroupRequest;
};

export type CreateGroupResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Group;
};

/** @internal */
export type CreateGroupRequest$Outbound = {
  workspace_id: string;
  environment: string;
  "Idempotency-Key"?: string | undefined;
  body: models.GroupRequest$Outbound;
};

/** @internal */
export const CreateGroupRequest$outboundSchema: z.ZodMiniType<
  CreateGroupRequest$Outbound,
  CreateGroupRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    idempotencyKey: z.optional(z.string()),
    body: models.GroupRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function createGroupRequestToJSON(
  createGroupRequest: CreateGroupRequest,
): string {
  return JSON.stringify(
    CreateGroupRequest$outboundSchema.parse(createGroupRequest),
  );
}

/** @internal */
export const CreateGroupResponse$inboundSchema: z.ZodMiniType<
  CreateGroupResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Group$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function createGroupResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateGroupResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateGroupResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateGroupResponse' from JSON`,
  );
}
