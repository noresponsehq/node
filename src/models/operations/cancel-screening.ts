import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CancelScreeningRequest = {
  groupId: string;
  screeningId: string;
  body: models.ScreeningCancelRequest;
};

export type CancelScreeningResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Screening;
};

/** @internal */
export type CancelScreeningRequest$Outbound = {
  group_id: string;
  screening_id: string;
  body: models.ScreeningCancelRequest$Outbound;
};

/** @internal */
export const CancelScreeningRequest$outboundSchema: z.ZodMiniType<
  CancelScreeningRequest$Outbound,
  CancelScreeningRequest
> = z.pipe(
  z.object({
    groupId: z.string(),
    screeningId: z.string(),
    body: models.ScreeningCancelRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      groupId: "group_id",
      screeningId: "screening_id",
    });
  }),
);

export function cancelScreeningRequestToJSON(
  cancelScreeningRequest: CancelScreeningRequest,
): string {
  return JSON.stringify(
    CancelScreeningRequest$outboundSchema.parse(cancelScreeningRequest),
  );
}

/** @internal */
export const CancelScreeningResponse$inboundSchema: z.ZodMiniType<
  CancelScreeningResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Screening$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function cancelScreeningResponseFromJSON(
  jsonString: string,
): SafeParseResult<CancelScreeningResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CancelScreeningResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CancelScreeningResponse' from JSON`,
  );
}
