import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ResendInviteRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The invite's inv_ id. An invite of another workspace, or one no longer pending, answers 404.
   */
  inviteId: string;
  body: models.InviteResendRequest;
};

export type ResendInviteResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Invite;
};

/** @internal */
export type ResendInviteRequest$Outbound = {
  workspace_id: string;
  invite_id: string;
  body: models.InviteResendRequest$Outbound;
};

/** @internal */
export const ResendInviteRequest$outboundSchema: z.ZodMiniType<
  ResendInviteRequest$Outbound,
  ResendInviteRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    inviteId: z.string(),
    body: models.InviteResendRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      inviteId: "invite_id",
    });
  }),
);

export function resendInviteRequestToJSON(
  resendInviteRequest: ResendInviteRequest,
): string {
  return JSON.stringify(
    ResendInviteRequest$outboundSchema.parse(resendInviteRequest),
  );
}

/** @internal */
export const ResendInviteResponse$inboundSchema: z.ZodMiniType<
  ResendInviteResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Invite$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function resendInviteResponseFromJSON(
  jsonString: string,
): SafeParseResult<ResendInviteResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ResendInviteResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ResendInviteResponse' from JSON`,
  );
}
