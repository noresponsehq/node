import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Member, Member$inboundSchema } from "./member.js";

/**
 * GET /v1/workspaces/{workspace_id}/members: the workspace's active members, oldest first, at most 100.
 */
export type MemberList = {
  items: Array<Member>;
};

/** @internal */
export const MemberList$inboundSchema: z.ZodMiniType<MemberList, unknown> = z
  .object({
    items: z.array(Member$inboundSchema),
  });

export function memberListFromJSON(
  jsonString: string,
): SafeParseResult<MemberList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => MemberList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'MemberList' from JSON`,
  );
}
