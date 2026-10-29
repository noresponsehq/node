import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Invite, Invite$inboundSchema } from "./invite.js";

/**
 * GET /v1/workspaces/{workspace_id}/invites: the workspace's pending invites, oldest first, at most 50, with no token.
 */
export type InviteList = {
  items: Array<Invite>;
};

/** @internal */
export const InviteList$inboundSchema: z.ZodMiniType<InviteList, unknown> = z
  .object({
    items: z.array(Invite$inboundSchema),
  });

export function inviteListFromJSON(
  jsonString: string,
): SafeParseResult<InviteList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => InviteList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'InviteList' from JSON`,
  );
}
