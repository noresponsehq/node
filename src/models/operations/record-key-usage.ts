import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RecordKeyUsageRequest = {
  /**
   * Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the tenant principal and bound to the canonical body for 24 hours.
   */
  idempotencyKey: string;
  body: models.KeyUsageBatchRequest;
};

export type RecordKeyUsageResponse = {
  headers: { [k: string]: Array<string> };
  result: models.KeyUsageBatch;
};

/** @internal */
export type RecordKeyUsageRequest$Outbound = {
  "Idempotency-Key": string;
  body: models.KeyUsageBatchRequest$Outbound;
};

/** @internal */
export const RecordKeyUsageRequest$outboundSchema: z.ZodMiniType<
  RecordKeyUsageRequest$Outbound,
  RecordKeyUsageRequest
> = z.pipe(
  z.object({
    idempotencyKey: z.string(),
    body: models.KeyUsageBatchRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function recordKeyUsageRequestToJSON(
  recordKeyUsageRequest: RecordKeyUsageRequest,
): string {
  return JSON.stringify(
    RecordKeyUsageRequest$outboundSchema.parse(recordKeyUsageRequest),
  );
}

/** @internal */
export const RecordKeyUsageResponse$inboundSchema: z.ZodMiniType<
  RecordKeyUsageResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.KeyUsageBatch$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function recordKeyUsageResponseFromJSON(
  jsonString: string,
): SafeParseResult<RecordKeyUsageResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordKeyUsageResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordKeyUsageResponse' from JSON`,
  );
}
