import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListAccountCredentialsRequest = {
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

export type ListAccountCredentialsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.CredentialPage;
};

/** @internal */
export type ListAccountCredentialsRequest$Outbound = {
  account_id: string;
  limit: number;
  cursor?: string | undefined;
};

/** @internal */
export const ListAccountCredentialsRequest$outboundSchema: z.ZodMiniType<
  ListAccountCredentialsRequest$Outbound,
  ListAccountCredentialsRequest
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

export function listAccountCredentialsRequestToJSON(
  listAccountCredentialsRequest: ListAccountCredentialsRequest,
): string {
  return JSON.stringify(
    ListAccountCredentialsRequest$outboundSchema.parse(
      listAccountCredentialsRequest,
    ),
  );
}

/** @internal */
export const ListAccountCredentialsResponse$inboundSchema: z.ZodMiniType<
  ListAccountCredentialsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.CredentialPage$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listAccountCredentialsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListAccountCredentialsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListAccountCredentialsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListAccountCredentialsResponse' from JSON`,
  );
}
