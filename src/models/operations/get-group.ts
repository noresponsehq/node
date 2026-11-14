import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetGroupRequest = {
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

export type GetGroupResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Group;
};

/** @internal */
export type GetGroupRequest$Outbound = {
  workspace_id: string;
  environment: string;
  group_id: string;
};

/** @internal */
export const GetGroupRequest$outboundSchema: z.ZodMiniType<
  GetGroupRequest$Outbound,
  GetGroupRequest
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

export function getGroupRequestToJSON(
  getGroupRequest: GetGroupRequest,
): string {
  return JSON.stringify(GetGroupRequest$outboundSchema.parse(getGroupRequest));
}

/** @internal */
export const GetGroupResponse$inboundSchema: z.ZodMiniType<
  GetGroupResponse,
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

export function getGroupResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetGroupResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetGroupResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetGroupResponse' from JSON`,
  );
}
