import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetAttendeeRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  eventId: string;
  attendeeId: string;
};

export type GetAttendeeResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AttendeeReport;
};

/** @internal */
export type GetAttendeeRequest$Outbound = {
  workspace_id: string;
  environment: string;
  event_id: string;
  attendee_id: string;
};

/** @internal */
export const GetAttendeeRequest$outboundSchema: z.ZodMiniType<
  GetAttendeeRequest$Outbound,
  GetAttendeeRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    eventId: z.string(),
    attendeeId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      eventId: "event_id",
      attendeeId: "attendee_id",
    });
  }),
);

export function getAttendeeRequestToJSON(
  getAttendeeRequest: GetAttendeeRequest,
): string {
  return JSON.stringify(
    GetAttendeeRequest$outboundSchema.parse(getAttendeeRequest),
  );
}

/** @internal */
export const GetAttendeeResponse$inboundSchema: z.ZodMiniType<
  GetAttendeeResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AttendeeReport$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getAttendeeResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetAttendeeResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetAttendeeResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetAttendeeResponse' from JSON`,
  );
}
