import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ReviewAttendeeRequest = {
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
  body: models.AttendeeReviewRequest;
};

export type ReviewAttendeeResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Attendee;
};

/** @internal */
export type ReviewAttendeeRequest$Outbound = {
  workspace_id: string;
  environment: string;
  event_id: string;
  attendee_id: string;
  body: models.AttendeeReviewRequest$Outbound;
};

/** @internal */
export const ReviewAttendeeRequest$outboundSchema: z.ZodMiniType<
  ReviewAttendeeRequest$Outbound,
  ReviewAttendeeRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    eventId: z.string(),
    attendeeId: z.string(),
    body: models.AttendeeReviewRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      eventId: "event_id",
      attendeeId: "attendee_id",
    });
  }),
);

export function reviewAttendeeRequestToJSON(
  reviewAttendeeRequest: ReviewAttendeeRequest,
): string {
  return JSON.stringify(
    ReviewAttendeeRequest$outboundSchema.parse(reviewAttendeeRequest),
  );
}

/** @internal */
export const ReviewAttendeeResponse$inboundSchema: z.ZodMiniType<
  ReviewAttendeeResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Attendee$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function reviewAttendeeResponseFromJSON(
  jsonString: string,
): SafeParseResult<ReviewAttendeeResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewAttendeeResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewAttendeeResponse' from JSON`,
  );
}
