import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type DeleteGroupRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  groupId: string;
};

export type DeleteGroupResponse = {
  headers: { [k: string]: Array<string> };
};

/** @internal */
export type DeleteGroupRequest$Outbound = {
  workspace_id: string;
  environment: string;
  group_id: string;
};

/** @internal */
export const DeleteGroupRequest$outboundSchema: z.ZodMiniType<
  DeleteGroupRequest$Outbound,
  DeleteGroupRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    groupId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      groupId: "group_id",
    });
  }),
);

export function deleteGroupRequestToJSON(
  deleteGroupRequest: DeleteGroupRequest,
): string {
  return JSON.stringify(
    DeleteGroupRequest$outboundSchema.parse(deleteGroupRequest),
  );
}

/** @internal */
export const DeleteGroupResponse$inboundSchema: z.ZodMiniType<
  DeleteGroupResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
    });
  }),
);

export function deleteGroupResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteGroupResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteGroupResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteGroupResponse' from JSON`,
  );
}
