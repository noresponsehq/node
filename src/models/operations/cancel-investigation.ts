import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CancelInvestigationRequest = {
  investigationId: string;
  body: models.ScreeningCancelRequest;
};

export type CancelInvestigationResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Investigation;
};

/** @internal */
export type CancelInvestigationRequest$Outbound = {
  investigation_id: string;
  body: models.ScreeningCancelRequest$Outbound;
};

/** @internal */
export const CancelInvestigationRequest$outboundSchema: z.ZodMiniType<
  CancelInvestigationRequest$Outbound,
  CancelInvestigationRequest
> = z.pipe(
  z.object({
    investigationId: z.string(),
    body: models.ScreeningCancelRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      investigationId: "investigation_id",
    });
  }),
);

export function cancelInvestigationRequestToJSON(
  cancelInvestigationRequest: CancelInvestigationRequest,
): string {
  return JSON.stringify(
    CancelInvestigationRequest$outboundSchema.parse(cancelInvestigationRequest),
  );
}

/** @internal */
export const CancelInvestigationResponse$inboundSchema: z.ZodMiniType<
  CancelInvestigationResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Investigation$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function cancelInvestigationResponseFromJSON(
  jsonString: string,
): SafeParseResult<CancelInvestigationResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CancelInvestigationResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CancelInvestigationResponse' from JSON`,
  );
}
