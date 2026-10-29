import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListAccountDecisionsRequest = {
  /**
   * The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.
   */
  accountId: string;
  /**
   * Items per page.
   */
  limit?: number | undefined;
  /**
   * next_cursor from the previous page, unchanged.
   */
  cursor?: string | undefined;
};

export type ListAccountDecisionsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AccountDecisionList;
};

/** @internal */
export type ListAccountDecisionsRequest$Outbound = {
  account_id: string;
  limit: number;
  cursor?: string | undefined;
};

/** @internal */
export const ListAccountDecisionsRequest$outboundSchema: z.ZodMiniType<
  ListAccountDecisionsRequest$Outbound,
  ListAccountDecisionsRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
    limit: z._default(z.int(), 20),
    cursor: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
    });
  }),
);

export function listAccountDecisionsRequestToJSON(
  listAccountDecisionsRequest: ListAccountDecisionsRequest,
): string {
  return JSON.stringify(
    ListAccountDecisionsRequest$outboundSchema.parse(
      listAccountDecisionsRequest,
    ),
  );
}

/** @internal */
export const ListAccountDecisionsResponse$inboundSchema: z.ZodMiniType<
  ListAccountDecisionsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AccountDecisionList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listAccountDecisionsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListAccountDecisionsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListAccountDecisionsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListAccountDecisionsResponse' from JSON`,
  );
}
