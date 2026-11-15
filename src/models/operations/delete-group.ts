import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";

export type DeleteGroupRequest = {
  groupId: string;
};

export type DeleteGroupResponse = {
  headers: { [k: string]: Array<string> };
};

/** @internal */
export type DeleteGroupRequest$Outbound = {
  group_id: string;
};

/** @internal */
export const DeleteGroupRequest$outboundSchema: z.ZodMiniType<
  DeleteGroupRequest$Outbound,
  DeleteGroupRequest
> = z.pipe(
  z.object({
    groupId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
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
