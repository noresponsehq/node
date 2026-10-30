import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListLinkedAccountsRequest = {
  /**
   * The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.
   */
  accountId: string;
  /**
   * Linked accounts per page.
   */
  limit?: number | undefined;
  /**
   * next_cursor from the previous page, unchanged.
   */
  cursor?: string | undefined;
};

export type ListLinkedAccountsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.LinkedAccountPage;
};

/** @internal */
export type ListLinkedAccountsRequest$Outbound = {
  account_id: string;
  limit: number;
  cursor?: string | undefined;
};

/** @internal */
export const ListLinkedAccountsRequest$outboundSchema: z.ZodMiniType<
  ListLinkedAccountsRequest$Outbound,
  ListLinkedAccountsRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
    limit: z._default(z.int(), 25),
    cursor: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
    });
  }),
);

export function listLinkedAccountsRequestToJSON(
  listLinkedAccountsRequest: ListLinkedAccountsRequest,
): string {
  return JSON.stringify(
    ListLinkedAccountsRequest$outboundSchema.parse(listLinkedAccountsRequest),
  );
}

/** @internal */
export const ListLinkedAccountsResponse$inboundSchema: z.ZodMiniType<
  ListLinkedAccountsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.LinkedAccountPage$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listLinkedAccountsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListLinkedAccountsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListLinkedAccountsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListLinkedAccountsResponse' from JSON`,
  );
}
