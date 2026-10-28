import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RetireAccountCredentialRequest = {
  /**
   * The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.
   */
  accountId: string;
  credentialId: string;
};

export type RetireAccountCredentialResponse = {
  headers: { [k: string]: Array<string> };
  result: models.CredentialAssociation;
};

/** @internal */
export type RetireAccountCredentialRequest$Outbound = {
  account_id: string;
  credential_id: string;
};

/** @internal */
export const RetireAccountCredentialRequest$outboundSchema: z.ZodMiniType<
  RetireAccountCredentialRequest$Outbound,
  RetireAccountCredentialRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
    credentialId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      credentialId: "credential_id",
    });
  }),
);

export function retireAccountCredentialRequestToJSON(
  retireAccountCredentialRequest: RetireAccountCredentialRequest,
): string {
  return JSON.stringify(
    RetireAccountCredentialRequest$outboundSchema.parse(
      retireAccountCredentialRequest,
    ),
  );
}

/** @internal */
export const RetireAccountCredentialResponse$inboundSchema: z.ZodMiniType<
  RetireAccountCredentialResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.CredentialAssociation$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function retireAccountCredentialResponseFromJSON(
  jsonString: string,
): SafeParseResult<RetireAccountCredentialResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RetireAccountCredentialResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RetireAccountCredentialResponse' from JSON`,
  );
}
