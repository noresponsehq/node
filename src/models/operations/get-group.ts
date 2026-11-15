import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetGroupRequest = {
  groupId: string;
};

export type GetGroupResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Group;
};

/** @internal */
export type GetGroupRequest$Outbound = {
  group_id: string;
};

/** @internal */
export const GetGroupRequest$outboundSchema: z.ZodMiniType<
  GetGroupRequest$Outbound,
  GetGroupRequest
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
