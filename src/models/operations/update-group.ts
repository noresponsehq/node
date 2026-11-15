import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type UpdateGroupRequest = {
  groupId: string;
  body: models.GroupUpdate;
};

export type UpdateGroupResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Group;
};

/** @internal */
export type UpdateGroupRequest$Outbound = {
  group_id: string;
  body: models.GroupUpdate$Outbound;
};

/** @internal */
export const UpdateGroupRequest$outboundSchema: z.ZodMiniType<
  UpdateGroupRequest$Outbound,
  UpdateGroupRequest
> = z.pipe(
  z.object({
    groupId: z.string(),
    body: models.GroupUpdate$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      groupId: "group_id",
    });
  }),
);

export function updateGroupRequestToJSON(
  updateGroupRequest: UpdateGroupRequest,
): string {
  return JSON.stringify(
    UpdateGroupRequest$outboundSchema.parse(updateGroupRequest),
  );
}

/** @internal */
export const UpdateGroupResponse$inboundSchema: z.ZodMiniType<
  UpdateGroupResponse,
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

export function updateGroupResponseFromJSON(
  jsonString: string,
): SafeParseResult<UpdateGroupResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UpdateGroupResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UpdateGroupResponse' from JSON`,
  );
}
