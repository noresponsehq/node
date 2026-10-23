import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetAccountRequest = {
  /**
   * The account_id the tenant sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.
   */
  accountId: string;
};

export type GetAccountResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Account;
};

/** @internal */
export type GetAccountRequest$Outbound = {
  account_id: string;
};

/** @internal */
export const GetAccountRequest$outboundSchema: z.ZodMiniType<
  GetAccountRequest$Outbound,
  GetAccountRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
    });
  }),
);

export function getAccountRequestToJSON(
  getAccountRequest: GetAccountRequest,
): string {
  return JSON.stringify(
    GetAccountRequest$outboundSchema.parse(getAccountRequest),
  );
}

/** @internal */
export const GetAccountResponse$inboundSchema: z.ZodMiniType<
  GetAccountResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Account$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getAccountResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetAccountResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetAccountResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetAccountResponse' from JSON`,
  );
}
