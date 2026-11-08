import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetEventRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  eventId: string;
};

export type GetEventResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Event;
};

/** @internal */
export type GetEventRequest$Outbound = {
  workspace_id: string;
  environment: string;
  event_id: string;
};

/** @internal */
export const GetEventRequest$outboundSchema: z.ZodMiniType<
  GetEventRequest$Outbound,
  GetEventRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    eventId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      eventId: "event_id",
    });
  }),
);

export function getEventRequestToJSON(
  getEventRequest: GetEventRequest,
): string {
  return JSON.stringify(GetEventRequest$outboundSchema.parse(getEventRequest));
}

/** @internal */
export const GetEventResponse$inboundSchema: z.ZodMiniType<
  GetEventResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Event$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getEventResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetEventResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetEventResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetEventResponse' from JSON`,
  );
}
