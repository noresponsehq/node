import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListListEntriesRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  limit?: number | undefined;
  cursor?: string | undefined;
};

export type ListListEntriesResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ListEntryList;
};

/** @internal */
export type ListListEntriesRequest$Outbound = {
  workspace_id: string;
  environment: string;
  limit?: number | undefined;
  cursor?: string | undefined;
};

/** @internal */
export const ListListEntriesRequest$outboundSchema: z.ZodMiniType<
  ListListEntriesRequest$Outbound,
  ListListEntriesRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    limit: z.optional(z.int()),
    cursor: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function listListEntriesRequestToJSON(
  listListEntriesRequest: ListListEntriesRequest,
): string {
  return JSON.stringify(
    ListListEntriesRequest$outboundSchema.parse(listListEntriesRequest),
  );
}

/** @internal */
export const ListListEntriesResponse$inboundSchema: z.ZodMiniType<
  ListListEntriesResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ListEntryList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listListEntriesResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListListEntriesResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListListEntriesResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListListEntriesResponse' from JSON`,
  );
}
