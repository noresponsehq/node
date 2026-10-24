import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListAccountsRequest = {
  /**
   * next_cursor from an earlier page, unchanged. Absent, the list starts from the oldest change.
   */
  changedSince?: string | undefined;
  /**
   * Most accounts per page.
   */
  limit?: number | undefined;
  /**
   * true lists only accounts with a decision other than allow for some flow and no applied enforcement at their current risk_version.
   */
  unenforced?: boolean | undefined;
};

export type ListAccountsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AccountList;
};

/** @internal */
export type ListAccountsRequest$Outbound = {
  changed_since?: string | undefined;
  limit: number;
  unenforced: boolean;
};

/** @internal */
export const ListAccountsRequest$outboundSchema: z.ZodMiniType<
  ListAccountsRequest$Outbound,
  ListAccountsRequest
> = z.pipe(
  z.object({
    changedSince: z.optional(z.string()),
    limit: z._default(z.int(), 50),
    unenforced: z._default(z.boolean(), false),
  }),
  z.transform((v) => {
    return remap$(v, {
      changedSince: "changed_since",
    });
  }),
);

export function listAccountsRequestToJSON(
  listAccountsRequest: ListAccountsRequest,
): string {
  return JSON.stringify(
    ListAccountsRequest$outboundSchema.parse(listAccountsRequest),
  );
}

/** @internal */
export const ListAccountsResponse$inboundSchema: z.ZodMiniType<
  ListAccountsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AccountList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listAccountsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListAccountsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListAccountsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListAccountsResponse' from JSON`,
  );
}
