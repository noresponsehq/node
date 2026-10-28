import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RecordAccountOutcomeRequest = {
  /**
   * The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.
   */
  accountId: string;
  /**
   * Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours.
   */
  idempotencyKey: string;
  body: models.AccountOutcomeRequest;
};

export type RecordAccountOutcomeResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AccountOutcome;
};

/** @internal */
export type RecordAccountOutcomeRequest$Outbound = {
  account_id: string;
  "Idempotency-Key": string;
  body: models.AccountOutcomeRequest$Outbound;
};

/** @internal */
export const RecordAccountOutcomeRequest$outboundSchema: z.ZodMiniType<
  RecordAccountOutcomeRequest$Outbound,
  RecordAccountOutcomeRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
    idempotencyKey: z.string(),
    body: models.AccountOutcomeRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function recordAccountOutcomeRequestToJSON(
  recordAccountOutcomeRequest: RecordAccountOutcomeRequest,
): string {
  return JSON.stringify(
    RecordAccountOutcomeRequest$outboundSchema.parse(
      recordAccountOutcomeRequest,
    ),
  );
}

/** @internal */
export const RecordAccountOutcomeResponse$inboundSchema: z.ZodMiniType<
  RecordAccountOutcomeResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AccountOutcome$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function recordAccountOutcomeResponseFromJSON(
  jsonString: string,
): SafeParseResult<RecordAccountOutcomeResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordAccountOutcomeResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordAccountOutcomeResponse' from JSON`,
  );
}
