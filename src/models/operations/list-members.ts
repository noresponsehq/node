import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListMembersRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
};

export type ListMembersResponse = {
  headers: { [k: string]: Array<string> };
  result: models.MemberList;
};

/** @internal */
export type ListMembersRequest$Outbound = {
  workspace_id: string;
};

/** @internal */
export const ListMembersRequest$outboundSchema: z.ZodMiniType<
  ListMembersRequest$Outbound,
  ListMembersRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function listMembersRequestToJSON(
  listMembersRequest: ListMembersRequest,
): string {
  return JSON.stringify(
    ListMembersRequest$outboundSchema.parse(listMembersRequest),
  );
}

/** @internal */
export const ListMembersResponse$inboundSchema: z.ZodMiniType<
  ListMembersResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.MemberList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listMembersResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListMembersResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListMembersResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListMembersResponse' from JSON`,
  );
}
