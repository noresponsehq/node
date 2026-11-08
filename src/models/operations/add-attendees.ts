import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type AddAttendeesRequest = {
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
   * Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours.
   */
  idempotencyKey: string;
  body: models.AttendeeBatchRequest;
};

export type AddAttendeesResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AttendeeBatch;
};

/** @internal */
export type AddAttendeesRequest$Outbound = {
  workspace_id: string;
  environment: string;
  event_id: string;
  "Idempotency-Key": string;
  body: models.AttendeeBatchRequest$Outbound;
};

/** @internal */
export const AddAttendeesRequest$outboundSchema: z.ZodMiniType<
  AddAttendeesRequest$Outbound,
  AddAttendeesRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    eventId: z.string(),
    idempotencyKey: z.string(),
    body: models.AttendeeBatchRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      eventId: "event_id",
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function addAttendeesRequestToJSON(
  addAttendeesRequest: AddAttendeesRequest,
): string {
  return JSON.stringify(
    AddAttendeesRequest$outboundSchema.parse(addAttendeesRequest),
  );
}

/** @internal */
export const AddAttendeesResponse$inboundSchema: z.ZodMiniType<
  AddAttendeesResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AttendeeBatch$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function addAttendeesResponseFromJSON(
  jsonString: string,
): SafeParseResult<AddAttendeesResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AddAttendeesResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AddAttendeesResponse' from JSON`,
  );
}
