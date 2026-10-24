import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RecordEnforcementRequest = {
  /**
   * The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.
   */
  accountId: string;
  body: models.EnforcementRequest;
};

export type RecordEnforcementResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Enforcement;
};

/** @internal */
export type RecordEnforcementRequest$Outbound = {
  account_id: string;
  body: models.EnforcementRequest$Outbound;
};

/** @internal */
export const RecordEnforcementRequest$outboundSchema: z.ZodMiniType<
  RecordEnforcementRequest$Outbound,
  RecordEnforcementRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
    body: models.EnforcementRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
    });
  }),
);

export function recordEnforcementRequestToJSON(
  recordEnforcementRequest: RecordEnforcementRequest,
): string {
  return JSON.stringify(
    RecordEnforcementRequest$outboundSchema.parse(recordEnforcementRequest),
  );
}

/** @internal */
export const RecordEnforcementResponse$inboundSchema: z.ZodMiniType<
  RecordEnforcementResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Enforcement$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function recordEnforcementResponseFromJSON(
  jsonString: string,
): SafeParseResult<RecordEnforcementResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordEnforcementResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordEnforcementResponse' from JSON`,
  );
}
