import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";

export type RevokeInviteRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The invite's inv_ id. An invite of another workspace, or one no longer pending, answers 404.
   */
  inviteId: string;
};

export type RevokeInviteResponse = {
  headers: { [k: string]: Array<string> };
};

/** @internal */
export type RevokeInviteRequest$Outbound = {
  workspace_id: string;
  invite_id: string;
};

/** @internal */
export const RevokeInviteRequest$outboundSchema: z.ZodMiniType<
  RevokeInviteRequest$Outbound,
  RevokeInviteRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    inviteId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      inviteId: "invite_id",
    });
  }),
);

export function revokeInviteRequestToJSON(
  revokeInviteRequest: RevokeInviteRequest,
): string {
  return JSON.stringify(
    RevokeInviteRequest$outboundSchema.parse(revokeInviteRequest),
  );
}

/** @internal */
export const RevokeInviteResponse$inboundSchema: z.ZodMiniType<
  RevokeInviteResponse,
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

export function revokeInviteResponseFromJSON(
  jsonString: string,
): SafeParseResult<RevokeInviteResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RevokeInviteResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RevokeInviteResponse' from JSON`,
  );
}
