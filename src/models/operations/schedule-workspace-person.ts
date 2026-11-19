import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ScheduleWorkspacePersonRequest = {
  personId: string;
  body: models.PersonScheduleRequest;
};

export type ScheduleWorkspacePersonResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PersonSchedule;
};

/** @internal */
export type ScheduleWorkspacePersonRequest$Outbound = {
  person_id: string;
  body: models.PersonScheduleRequest$Outbound;
};

/** @internal */
export const ScheduleWorkspacePersonRequest$outboundSchema: z.ZodMiniType<
  ScheduleWorkspacePersonRequest$Outbound,
  ScheduleWorkspacePersonRequest
> = z.pipe(
  z.object({
    personId: z.string(),
    body: models.PersonScheduleRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      personId: "person_id",
    });
  }),
);

export function scheduleWorkspacePersonRequestToJSON(
  scheduleWorkspacePersonRequest: ScheduleWorkspacePersonRequest,
): string {
  return JSON.stringify(
    ScheduleWorkspacePersonRequest$outboundSchema.parse(
      scheduleWorkspacePersonRequest,
    ),
  );
}

/** @internal */
export const ScheduleWorkspacePersonResponse$inboundSchema: z.ZodMiniType<
  ScheduleWorkspacePersonResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.PersonSchedule$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function scheduleWorkspacePersonResponseFromJSON(
  jsonString: string,
): SafeParseResult<ScheduleWorkspacePersonResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScheduleWorkspacePersonResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScheduleWorkspacePersonResponse' from JSON`,
  );
}
