import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListInvitesRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
};

export type ListInvitesResponse = {
  headers: { [k: string]: Array<string> };
  result: models.InviteList;
};

/** @internal */
export type ListInvitesRequest$Outbound = {
  workspace_id: string;
};

/** @internal */
export const ListInvitesRequest$outboundSchema: z.ZodMiniType<
  ListInvitesRequest$Outbound,
  ListInvitesRequest
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

export function listInvitesRequestToJSON(
  listInvitesRequest: ListInvitesRequest,
): string {
  return JSON.stringify(
    ListInvitesRequest$outboundSchema.parse(listInvitesRequest),
  );
}

/** @internal */
export const ListInvitesResponse$inboundSchema: z.ZodMiniType<
  ListInvitesResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.InviteList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listInvitesResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListInvitesResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListInvitesResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListInvitesResponse' from JSON`,
  );
}
