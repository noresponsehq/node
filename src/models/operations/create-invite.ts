import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateInviteRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  body: models.InviteRequest;
};

export type CreateInviteResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Invite;
};

/** @internal */
export type CreateInviteRequest$Outbound = {
  workspace_id: string;
  body: models.InviteRequest$Outbound;
};

/** @internal */
export const CreateInviteRequest$outboundSchema: z.ZodMiniType<
  CreateInviteRequest$Outbound,
  CreateInviteRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    body: models.InviteRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function createInviteRequestToJSON(
  createInviteRequest: CreateInviteRequest,
): string {
  return JSON.stringify(
    CreateInviteRequest$outboundSchema.parse(createInviteRequest),
  );
}

/** @internal */
export const CreateInviteResponse$inboundSchema: z.ZodMiniType<
  CreateInviteResponse,
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

export function createInviteResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateInviteResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateInviteResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateInviteResponse' from JSON`,
  );
}
