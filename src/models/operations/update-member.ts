import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type UpdateMemberRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The member's mem_ id. A member of another workspace, or a removed one, answers 404.
   */
  memberId: string;
  body: models.MemberUpdateRequest;
};

export type UpdateMemberResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Member;
};

/** @internal */
export type UpdateMemberRequest$Outbound = {
  workspace_id: string;
  member_id: string;
  body: models.MemberUpdateRequest$Outbound;
};

/** @internal */
export const UpdateMemberRequest$outboundSchema: z.ZodMiniType<
  UpdateMemberRequest$Outbound,
  UpdateMemberRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    memberId: z.string(),
    body: models.MemberUpdateRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      memberId: "member_id",
    });
  }),
);

export function updateMemberRequestToJSON(
  updateMemberRequest: UpdateMemberRequest,
): string {
  return JSON.stringify(
    UpdateMemberRequest$outboundSchema.parse(updateMemberRequest),
  );
}

/** @internal */
export const UpdateMemberResponse$inboundSchema: z.ZodMiniType<
  UpdateMemberResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Member$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function updateMemberResponseFromJSON(
  jsonString: string,
): SafeParseResult<UpdateMemberResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UpdateMemberResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UpdateMemberResponse' from JSON`,
  );
}
