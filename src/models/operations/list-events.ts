import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListEventsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  /**
   * At most this many items.
   */
  limit?: number | undefined;
  /**
   * Read events older than this one.
   */
  before?: string | undefined;
};

export type ListEventsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.EventList;
};

/** @internal */
export type ListEventsRequest$Outbound = {
  workspace_id: string;
  environment: string;
  limit: number;
  before?: string | undefined;
};

/** @internal */
export const ListEventsRequest$outboundSchema: z.ZodMiniType<
  ListEventsRequest$Outbound,
  ListEventsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    limit: z._default(z.int(), 20),
    before: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function listEventsRequestToJSON(
  listEventsRequest: ListEventsRequest,
): string {
  return JSON.stringify(
    ListEventsRequest$outboundSchema.parse(listEventsRequest),
  );
}

/** @internal */
export const ListEventsResponse$inboundSchema: z.ZodMiniType<
  ListEventsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.EventList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listEventsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListEventsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListEventsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListEventsResponse' from JSON`,
  );
}
