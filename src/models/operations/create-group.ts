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
    body: models.GroupRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
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
