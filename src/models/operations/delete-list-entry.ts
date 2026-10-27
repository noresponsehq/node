import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type DeleteListEntryRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  /**
   * The entry's id. An entry of another environment or workspace answers 404.
   */
  listEntryId: string;
};

export type DeleteListEntryResponse = {
  headers: { [k: string]: Array<string> };
};

/** @internal */
export type DeleteListEntryRequest$Outbound = {
  workspace_id: string;
  environment: string;
  list_entry_id: string;
};

/** @internal */
export const DeleteListEntryRequest$outboundSchema: z.ZodMiniType<
  DeleteListEntryRequest$Outbound,
  DeleteListEntryRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    listEntryId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      listEntryId: "list_entry_id",
    });
  }),
);

export function deleteListEntryRequestToJSON(
  deleteListEntryRequest: DeleteListEntryRequest,
): string {
  return JSON.stringify(
    DeleteListEntryRequest$outboundSchema.parse(deleteListEntryRequest),
  );
}

/** @internal */
export const DeleteListEntryResponse$inboundSchema: z.ZodMiniType<
  DeleteListEntryResponse,
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

export function deleteListEntryResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteListEntryResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteListEntryResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteListEntryResponse' from JSON`,
  );
}
