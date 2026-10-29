import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";

export type RemoveMemberRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The member's mem_ id. A member of another workspace, or a removed one, answers 404.
   */
  memberId: string;
};

export type RemoveMemberResponse = {
  headers: { [k: string]: Array<string> };
};

/** @internal */
export type RemoveMemberRequest$Outbound = {
  workspace_id: string;
  member_id: string;
};

/** @internal */
export const RemoveMemberRequest$outboundSchema: z.ZodMiniType<
  RemoveMemberRequest$Outbound,
  RemoveMemberRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    memberId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      memberId: "member_id",
    });
  }),
);

export function removeMemberRequestToJSON(
  removeMemberRequest: RemoveMemberRequest,
): string {
  return JSON.stringify(
    RemoveMemberRequest$outboundSchema.parse(removeMemberRequest),
  );
}

/** @internal */
export const RemoveMemberResponse$inboundSchema: z.ZodMiniType<
  RemoveMemberResponse,
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

export function removeMemberResponseFromJSON(
  jsonString: string,
): SafeParseResult<RemoveMemberResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RemoveMemberResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RemoveMemberResponse' from JSON`,
  );
}
