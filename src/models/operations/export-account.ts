import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ExportAccountRequest = {
  /**
   * The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.
   */
  accountId: string;
  /**
   * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
   */
  responseMode?: models.ResponseMode | undefined;
};

export type ExportAccountResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AccountExport;
};

/** @internal */
export type ExportAccountRequest$Outbound = {
  account_id: string;
  response_mode?: string | undefined;
};

/** @internal */
export const ExportAccountRequest$outboundSchema: z.ZodMiniType<
  ExportAccountRequest$Outbound,
  ExportAccountRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
    responseMode: z.optional(models.ResponseMode$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      responseMode: "response_mode",
    });
  }),
);

export function exportAccountRequestToJSON(
  exportAccountRequest: ExportAccountRequest,
): string {
  return JSON.stringify(
    ExportAccountRequest$outboundSchema.parse(exportAccountRequest),
  );
}

/** @internal */
export const ExportAccountResponse$inboundSchema: z.ZodMiniType<
  ExportAccountResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AccountExport$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function exportAccountResponseFromJSON(
  jsonString: string,
): SafeParseResult<ExportAccountResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ExportAccountResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ExportAccountResponse' from JSON`,
  );
}
