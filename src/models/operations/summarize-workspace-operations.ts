import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type SummarizeWorkspaceOperationsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  body: models.WorkspaceOperationsSummaryRequest;
};

export type SummarizeWorkspaceOperationsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.WorkspaceOperationsSummary;
};

/** @internal */
export type SummarizeWorkspaceOperationsRequest$Outbound = {
  workspace_id: string;
  body: models.WorkspaceOperationsSummaryRequest$Outbound;
};

/** @internal */
export const SummarizeWorkspaceOperationsRequest$outboundSchema: z.ZodMiniType<
  SummarizeWorkspaceOperationsRequest$Outbound,
  SummarizeWorkspaceOperationsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    body: models.WorkspaceOperationsSummaryRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function summarizeWorkspaceOperationsRequestToJSON(
  summarizeWorkspaceOperationsRequest: SummarizeWorkspaceOperationsRequest,
): string {
  return JSON.stringify(
    SummarizeWorkspaceOperationsRequest$outboundSchema.parse(
      summarizeWorkspaceOperationsRequest,
    ),
  );
}

/** @internal */
export const SummarizeWorkspaceOperationsResponse$inboundSchema: z.ZodMiniType<
  SummarizeWorkspaceOperationsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.WorkspaceOperationsSummary$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function summarizeWorkspaceOperationsResponseFromJSON(
  jsonString: string,
): SafeParseResult<SummarizeWorkspaceOperationsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) =>
      SummarizeWorkspaceOperationsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SummarizeWorkspaceOperationsResponse' from JSON`,
  );
}
