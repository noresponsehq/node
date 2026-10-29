import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListPolicyHistoryRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  beforeVersion?: number | undefined;
  limit?: number | undefined;
};

export type ListPolicyHistoryResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PolicyHistory;
};

/** @internal */
export type ListPolicyHistoryRequest$Outbound = {
  workspace_id: string;
  environment: string;
  before_version?: number | undefined;
  limit: number;
};

/** @internal */
export const ListPolicyHistoryRequest$outboundSchema: z.ZodMiniType<
  ListPolicyHistoryRequest$Outbound,
  ListPolicyHistoryRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    beforeVersion: z.optional(z.int()),
    limit: z._default(z.int(), 50),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      beforeVersion: "before_version",
    });
  }),
);

export function listPolicyHistoryRequestToJSON(
  listPolicyHistoryRequest: ListPolicyHistoryRequest,
): string {
  return JSON.stringify(
    ListPolicyHistoryRequest$outboundSchema.parse(listPolicyHistoryRequest),
  );
}

/** @internal */
export const ListPolicyHistoryResponse$inboundSchema: z.ZodMiniType<
  ListPolicyHistoryResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.PolicyHistory$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listPolicyHistoryResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListPolicyHistoryResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListPolicyHistoryResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListPolicyHistoryResponse' from JSON`,
  );
}
