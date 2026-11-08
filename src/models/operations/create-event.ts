import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateEventRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  body: models.EventRequest;
};

export type CreateEventResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Event;
};

/** @internal */
export type CreateEventRequest$Outbound = {
  workspace_id: string;
  environment: string;
  body: models.EventRequest$Outbound;
};

/** @internal */
export const CreateEventRequest$outboundSchema: z.ZodMiniType<
  CreateEventRequest$Outbound,
  CreateEventRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    body: models.EventRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function createEventRequestToJSON(
  createEventRequest: CreateEventRequest,
): string {
  return JSON.stringify(
    CreateEventRequest$outboundSchema.parse(createEventRequest),
  );
}

/** @internal */
export const CreateEventResponse$inboundSchema: z.ZodMiniType<
  CreateEventResponse,
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

export function createEventResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateEventResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateEventResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateEventResponse' from JSON`,
  );
}
