import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListGroupsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  /**
   * At most this many items.
   */
  limit?: number | undefined;
  /**
   * Read groups older than this one.
   */
  before?: string | undefined;
};

export type ListGroupsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.GroupList;
};

/** @internal */
export type ListGroupsRequest$Outbound = {
  workspace_id: string;
  environment: string;
  limit: number;
  before?: string | undefined;
};

/** @internal */
export const ListGroupsRequest$outboundSchema: z.ZodMiniType<
  ListGroupsRequest$Outbound,
  ListGroupsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    limit: z._default(z.int(), 20),
    before: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function listGroupsRequestToJSON(
  listGroupsRequest: ListGroupsRequest,
): string {
  return JSON.stringify(
    ListGroupsRequest$outboundSchema.parse(listGroupsRequest),
  );
}

/** @internal */
export const ListGroupsResponse$inboundSchema: z.ZodMiniType<
  ListGroupsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.GroupList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listGroupsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListGroupsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListGroupsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListGroupsResponse' from JSON`,
  );
}
