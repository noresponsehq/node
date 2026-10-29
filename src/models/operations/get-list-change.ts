import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetListChangeRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  changeId: string;
};

export type GetListChangeResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ListChange;
};

/** @internal */
export type GetListChangeRequest$Outbound = {
  workspace_id: string;
  environment: string;
  change_id: string;
};

/** @internal */
export const GetListChangeRequest$outboundSchema: z.ZodMiniType<
  GetListChangeRequest$Outbound,
  GetListChangeRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    changeId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      changeId: "change_id",
    });
  }),
);

export function getListChangeRequestToJSON(
  getListChangeRequest: GetListChangeRequest,
): string {
  return JSON.stringify(
    GetListChangeRequest$outboundSchema.parse(getListChangeRequest),
  );
}

/** @internal */
export const GetListChangeResponse$inboundSchema: z.ZodMiniType<
  GetListChangeResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ListChange$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getListChangeResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetListChangeResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetListChangeResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetListChangeResponse' from JSON`,
  );
}
