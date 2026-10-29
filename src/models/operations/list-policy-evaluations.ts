import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListPolicyEvaluationsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  limit?: number | undefined;
  before?: string | undefined;
};

export type ListPolicyEvaluationsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PolicyEvaluationList;
};

/** @internal */
export type ListPolicyEvaluationsRequest$Outbound = {
  workspace_id: string;
  environment: string;
  limit: number;
  before?: string | undefined;
};

/** @internal */
export const ListPolicyEvaluationsRequest$outboundSchema: z.ZodMiniType<
  ListPolicyEvaluationsRequest$Outbound,
  ListPolicyEvaluationsRequest
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

export function listPolicyEvaluationsRequestToJSON(
  listPolicyEvaluationsRequest: ListPolicyEvaluationsRequest,
): string {
  return JSON.stringify(
    ListPolicyEvaluationsRequest$outboundSchema.parse(
      listPolicyEvaluationsRequest,
    ),
  );
}

/** @internal */
export const ListPolicyEvaluationsResponse$inboundSchema: z.ZodMiniType<
  ListPolicyEvaluationsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.PolicyEvaluationList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listPolicyEvaluationsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListPolicyEvaluationsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListPolicyEvaluationsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListPolicyEvaluationsResponse' from JSON`,
  );
}
