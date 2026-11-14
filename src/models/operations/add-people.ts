import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type AddPeopleRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  groupId: string;
  /**
   * Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours.
   */
  idempotencyKey: string;
  body: models.PersonBatchRequest;
};

export type AddPeopleResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PersonBatch;
};

/** @internal */
export type AddPeopleRequest$Outbound = {
  workspace_id: string;
  environment: string;
  group_id: string;
  "Idempotency-Key": string;
  body: models.PersonBatchRequest$Outbound;
};

/** @internal */
export const AddPeopleRequest$outboundSchema: z.ZodMiniType<
  AddPeopleRequest$Outbound,
  AddPeopleRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    groupId: z.string(),
    idempotencyKey: z.string(),
    body: models.PersonBatchRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      groupId: "group_id",
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function addPeopleRequestToJSON(
  addPeopleRequest: AddPeopleRequest,
): string {
  return JSON.stringify(
    AddPeopleRequest$outboundSchema.parse(addPeopleRequest),
  );
}

/** @internal */
export const AddPeopleResponse$inboundSchema: z.ZodMiniType<
  AddPeopleResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.PersonBatch$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function addPeopleResponseFromJSON(
  jsonString: string,
): SafeParseResult<AddPeopleResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AddPeopleResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AddPeopleResponse' from JSON`,
  );
}
