import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetScreeningRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  eventId: string;
  screeningId: string;
};

export type GetScreeningResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Screening;
};

/** @internal */
export type GetScreeningRequest$Outbound = {
  workspace_id: string;
  environment: string;
  event_id: string;
  screening_id: string;
};

/** @internal */
export const GetScreeningRequest$outboundSchema: z.ZodMiniType<
  GetScreeningRequest$Outbound,
  GetScreeningRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    eventId: z.string(),
    screeningId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      eventId: "event_id",
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
