import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type DeleteEventRequest = {
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

export type DeleteEventResponse = {
  headers: { [k: string]: Array<string> };
};

/** @internal */
export type DeleteEventRequest$Outbound = {
  workspace_id: string;
  environment: string;
  event_id: string;
};

/** @internal */
export const DeleteEventRequest$outboundSchema: z.ZodMiniType<
  DeleteEventRequest$Outbound,
  DeleteEventRequest
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

export function deleteEventRequestToJSON(
  deleteEventRequest: DeleteEventRequest,
): string {
  return JSON.stringify(
    DeleteEventRequest$outboundSchema.parse(deleteEventRequest),
  );
}

/** @internal */
export const DeleteEventResponse$inboundSchema: z.ZodMiniType<
  DeleteEventResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
    });
  }),
);

export function deleteEventResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteEventResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteEventResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteEventResponse' from JSON`,
  );
}
