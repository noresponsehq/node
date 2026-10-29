import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetErasureReceiptRequest = {
  erasureId: string;
};

export type GetErasureReceiptResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ErasureReceipt;
};

/** @internal */
export type GetErasureReceiptRequest$Outbound = {
  erasure_id: string;
};

/** @internal */
export const GetErasureReceiptRequest$outboundSchema: z.ZodMiniType<
  GetErasureReceiptRequest$Outbound,
  GetErasureReceiptRequest
> = z.pipe(
  z.object({
    erasureId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      erasureId: "erasure_id",
    });
  }),
);

export function getErasureReceiptRequestToJSON(
  getErasureReceiptRequest: GetErasureReceiptRequest,
): string {
  return JSON.stringify(
    GetErasureReceiptRequest$outboundSchema.parse(getErasureReceiptRequest),
  );
}

/** @internal */
export const GetErasureReceiptResponse$inboundSchema: z.ZodMiniType<
  GetErasureReceiptResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ErasureReceipt$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getErasureReceiptResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetErasureReceiptResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetErasureReceiptResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetErasureReceiptResponse' from JSON`,
  );
}
