import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type DeleteAccountRequest = {
  /**
   * The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.
   */
  accountId: string;
};

export type DeleteAccountResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AccountDeletion;
};

/** @internal */
export type DeleteAccountRequest$Outbound = {
  account_id: string;
};

/** @internal */
export const DeleteAccountRequest$outboundSchema: z.ZodMiniType<
  DeleteAccountRequest$Outbound,
  DeleteAccountRequest
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

export function deleteAccountRequestToJSON(
  deleteAccountRequest: DeleteAccountRequest,
): string {
  return JSON.stringify(
    DeleteAccountRequest$outboundSchema.parse(deleteAccountRequest),
  );
}

/** @internal */
export const DeleteAccountResponse$inboundSchema: z.ZodMiniType<
  DeleteAccountResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AccountDeletion$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function deleteAccountResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteAccountResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteAccountResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteAccountResponse' from JSON`,
  );
}
