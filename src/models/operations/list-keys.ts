import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListKeysRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
};

export type ListKeysResponse = {
  headers: { [k: string]: Array<string> };
  result: models.KeyList;
};

/** @internal */
export type ListKeysRequest$Outbound = {
  workspace_id: string;
};

/** @internal */
export const ListKeysRequest$outboundSchema: z.ZodMiniType<
  ListKeysRequest$Outbound,
  ListKeysRequest
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

export function listKeysRequestToJSON(
  listKeysRequest: ListKeysRequest,
): string {
  return JSON.stringify(ListKeysRequest$outboundSchema.parse(listKeysRequest));
}

/** @internal */
export const ListKeysResponse$inboundSchema: z.ZodMiniType<
  ListKeysResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.KeyList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listKeysResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListKeysResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListKeysResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListKeysResponse' from JSON`,
  );
}
