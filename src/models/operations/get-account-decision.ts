import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetAccountDecisionRequest = {
  /**
   * The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.
   */
  accountId: string;
  /**
   * The canonical decimal risk_version originally served.
   */
  riskVersion: number;
};

export type GetAccountDecisionResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AccountDecisionSnapshot;
};

/** @internal */
export type GetAccountDecisionRequest$Outbound = {
  account_id: string;
  risk_version: number;
};

/** @internal */
export const GetAccountDecisionRequest$outboundSchema: z.ZodMiniType<
  GetAccountDecisionRequest$Outbound,
  GetAccountDecisionRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
    riskVersion: z.int(),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      riskVersion: "risk_version",
    });
  }),
);

export function getAccountDecisionRequestToJSON(
  getAccountDecisionRequest: GetAccountDecisionRequest,
): string {
  return JSON.stringify(
    GetAccountDecisionRequest$outboundSchema.parse(getAccountDecisionRequest),
  );
}

/** @internal */
export const GetAccountDecisionResponse$inboundSchema: z.ZodMiniType<
  GetAccountDecisionResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AccountDecisionSnapshot$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getAccountDecisionResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetAccountDecisionResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetAccountDecisionResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetAccountDecisionResponse' from JSON`,
  );
}
