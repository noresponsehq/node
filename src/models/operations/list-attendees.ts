import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListAttendeesRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  eventId: string;
  /**
   * At most this many attendees.
   */
  limit?: number | undefined;
  /**
   * Read attendees after this one.
   */
  after?: string | undefined;
  /**
   * Only attendees whose highest finding has this band; none for attendees with no finding.
   */
  band?: models.ListAttendeesBand | undefined;
  /**
   * Only attendees with this decision; undecided for none yet.
   */
  decision?: models.ListAttendeesDecision | undefined;
};

export type ListAttendeesResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AttendeeList;
};

/** @internal */
export type ListAttendeesRequest$Outbound = {
  workspace_id: string;
  environment: string;
  event_id: string;
  limit: number;
  after?: string | undefined;
  band?: string | undefined;
  decision?: string | undefined;
};

/** @internal */
export const ListAttendeesRequest$outboundSchema: z.ZodMiniType<
  ListAttendeesRequest$Outbound,
  ListAttendeesRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    eventId: z.string(),
    limit: z._default(z.int(), 100),
    after: z.optional(z.string()),
    band: z.optional(models.ListAttendeesBand$outboundSchema),
    decision: z.optional(models.ListAttendeesDecision$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      eventId: "event_id",
    });
  }),
);

export function listAttendeesRequestToJSON(
  listAttendeesRequest: ListAttendeesRequest,
): string {
  return JSON.stringify(
    ListAttendeesRequest$outboundSchema.parse(listAttendeesRequest),
  );
}

/** @internal */
export const ListAttendeesResponse$inboundSchema: z.ZodMiniType<
  ListAttendeesResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AttendeeList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listAttendeesResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListAttendeesResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListAttendeesResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListAttendeesResponse' from JSON`,
  );
}
