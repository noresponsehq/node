import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type UpdateEventRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  eventId: string;
  body: models.EventUpdate;
};

export type UpdateEventResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Event;
};

/** @internal */
export type UpdateEventRequest$Outbound = {
  workspace_id: string;
  environment: string;
  event_id: string;
  body: models.EventUpdate$Outbound;
};

/** @internal */
export const UpdateEventRequest$outboundSchema: z.ZodMiniType<
  UpdateEventRequest$Outbound,
  UpdateEventRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    eventId: z.string(),
    body: models.EventUpdate$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      eventId: "event_id",
    });
  }),
);

export function updateEventRequestToJSON(
  updateEventRequest: UpdateEventRequest,
): string {
  return JSON.stringify(
    UpdateEventRequest$outboundSchema.parse(updateEventRequest),
  );
}

/** @internal */
export const UpdateEventResponse$inboundSchema: z.ZodMiniType<
  UpdateEventResponse,
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

export function updateEventResponseFromJSON(
  jsonString: string,
): SafeParseResult<UpdateEventResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UpdateEventResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UpdateEventResponse' from JSON`,
  );
}
