import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type AssociateCredentialRequest = {
  /**
   * The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.
   */
  accountId: string;
  body: models.CredentialRequest;
};

export type AssociateCredentialResponse = {
  headers: { [k: string]: Array<string> };
  result: models.CredentialAssociation;
};

/** @internal */
export type AssociateCredentialRequest$Outbound = {
  account_id: string;
  body: models.CredentialRequest$Outbound;
};

/** @internal */
export const AssociateCredentialRequest$outboundSchema: z.ZodMiniType<
  AssociateCredentialRequest$Outbound,
  AssociateCredentialRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
    body: models.CredentialRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
    });
  }),
);

export function associateCredentialRequestToJSON(
  associateCredentialRequest: AssociateCredentialRequest,
): string {
  return JSON.stringify(
    AssociateCredentialRequest$outboundSchema.parse(associateCredentialRequest),
  );
}

/** @internal */
export const AssociateCredentialResponse$inboundSchema: z.ZodMiniType<
  AssociateCredentialResponse,
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

export function associateCredentialResponseFromJSON(
  jsonString: string,
): SafeParseResult<AssociateCredentialResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssociateCredentialResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssociateCredentialResponse' from JSON`,
  );
}
