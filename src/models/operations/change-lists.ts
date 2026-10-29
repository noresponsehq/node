import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ChangeListsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  /**
   * Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours.
   */
  idempotencyKey: string;
  body: models.ListBulkRequest;
};

export type ChangeListsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ListChange;
};

/** @internal */
export type ChangeListsRequest$Outbound = {
  workspace_id: string;
  environment: string;
  "Idempotency-Key": string;
  body: models.ListBulkRequest$Outbound;
};

/** @internal */
export const ChangeListsRequest$outboundSchema: z.ZodMiniType<
  ChangeListsRequest$Outbound,
  ChangeListsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    idempotencyKey: z.string(),
    body: models.ListBulkRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function changeListsRequestToJSON(
  changeListsRequest: ChangeListsRequest,
): string {
  return JSON.stringify(
    ChangeListsRequest$outboundSchema.parse(changeListsRequest),
  );
}

/** @internal */
export const ChangeListsResponse$inboundSchema: z.ZodMiniType<
  ChangeListsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ListChange$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function changeListsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ChangeListsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ChangeListsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ChangeListsResponse' from JSON`,
  );
}
