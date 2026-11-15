import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetInvestigationRequest = {
  investigationId: string;
};

export type GetInvestigationResponse = {
  headers: { [k: string]: Array<string> };
  result: models.InvestigationReport;
};

/** @internal */
export type GetInvestigationRequest$Outbound = {
  investigation_id: string;
};

/** @internal */
export const GetInvestigationRequest$outboundSchema: z.ZodMiniType<
  GetInvestigationRequest$Outbound,
  GetInvestigationRequest
> = z.pipe(
  z.object({
    investigationId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      investigationId: "investigation_id",
    });
  }),
);

export function getInvestigationRequestToJSON(
  getInvestigationRequest: GetInvestigationRequest,
): string {
  return JSON.stringify(
    GetInvestigationRequest$outboundSchema.parse(getInvestigationRequest),
  );
}

/** @internal */
export const GetInvestigationResponse$inboundSchema: z.ZodMiniType<
  GetInvestigationResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.InvestigationReport$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getInvestigationResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetInvestigationResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetInvestigationResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetInvestigationResponse' from JSON`,
  );
}
