import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListReviewsRequest = {
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
  status?: models.ReviewStatus | undefined;
  priority?: models.Priority | undefined;
  assignee?: string | undefined;
  unassigned?: boolean | undefined;
  /**
   * Filter by immutable member ID. Mutually exclusive with assignee and unassigned=true.
   */
  assigneePrincipalId?: string | undefined;
  /**
   * Only reviews of this exact account in the authenticated workspace and environment. Applied before pagination and bound into the cursor.
   */
  accountId?: string | undefined;
};

export type ListReviewsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ReviewList;
};

/** @internal */
export type ListReviewsRequest$Outbound = {
  workspace_id: string;
  environment: string;
  limit: number;
  cursor?: string | undefined;
  status?: string | undefined;
  priority?: string | undefined;
  assignee?: string | undefined;
  unassigned?: boolean | undefined;
  assignee_principal_id?: string | undefined;
  account_id?: string | undefined;
};

/** @internal */
export const ListReviewsRequest$outboundSchema: z.ZodMiniType<
  ListReviewsRequest$Outbound,
  ListReviewsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    limit: z._default(z.int(), 50),
    cursor: z.optional(z.string()),
    status: z.optional(models.ReviewStatus$outboundSchema),
    priority: z.optional(models.Priority$outboundSchema),
    assignee: z.optional(z.string()),
    unassigned: z.optional(z.boolean()),
    assigneePrincipalId: z.optional(z.string()),
    accountId: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      assigneePrincipalId: "assignee_principal_id",
      accountId: "account_id",
    });
  }),
);

export function listReviewsRequestToJSON(
  listReviewsRequest: ListReviewsRequest,
): string {
  return JSON.stringify(
    ListReviewsRequest$outboundSchema.parse(listReviewsRequest),
  );
}

/** @internal */
export const ListReviewsResponse$inboundSchema: z.ZodMiniType<
  ListReviewsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ReviewList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listReviewsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListReviewsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListReviewsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListReviewsResponse' from JSON`,
  );
}
