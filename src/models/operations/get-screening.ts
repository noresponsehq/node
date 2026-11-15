import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetScreeningRequest = {
  groupId: string;
  screeningId: string;
};

export type GetScreeningResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Screening;
};

/** @internal */
export type GetScreeningRequest$Outbound = {
  group_id: string;
  screening_id: string;
};

/** @internal */
export const GetScreeningRequest$outboundSchema: z.ZodMiniType<
  GetScreeningRequest$Outbound,
  GetScreeningRequest
> = z.pipe(
  z.object({
    groupId: z.string(),
    screeningId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      groupId: "group_id",
      screeningId: "screening_id",
    });
  }),
);

export function getScreeningRequestToJSON(
  getScreeningRequest: GetScreeningRequest,
): string {
  return JSON.stringify(
    GetScreeningRequest$outboundSchema.parse(getScreeningRequest),
  );
}

/** @internal */
export const GetScreeningResponse$inboundSchema: z.ZodMiniType<
  GetScreeningResponse,
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

export function getScreeningResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetScreeningResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetScreeningResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetScreeningResponse' from JSON`,
  );
}
