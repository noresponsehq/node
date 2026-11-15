import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type StartSearchRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  groupId: string;
  personId: string;
  /**
   * Opaque request key, 16 to 128 characters. Repeating the key and request returns the same resource in its current state while it is retained. A different request with the same key answers 409. Use a new key for a deliberate new operation. Keys are scoped to the environment and operation; person searches also scope them to the group and person.
   */
  idempotencyKey?: string | undefined;
  body: models.SearchRequest;
};

export type StartSearchResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Search;
};

/** @internal */
export type StartSearchRequest$Outbound = {
  workspace_id: string;
  environment: string;
  group_id: string;
  person_id: string;
  "Idempotency-Key"?: string | undefined;
  body: models.SearchRequest$Outbound;
};

/** @internal */
export const StartSearchRequest$outboundSchema: z.ZodMiniType<
  StartSearchRequest$Outbound,
  StartSearchRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    groupId: z.string(),
    personId: z.string(),
    idempotencyKey: z.optional(z.string()),
    body: models.SearchRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      groupId: "group_id",
      personId: "person_id",
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function startSearchRequestToJSON(
  startSearchRequest: StartSearchRequest,
): string {
  return JSON.stringify(
    StartSearchRequest$outboundSchema.parse(startSearchRequest),
  );
}

/** @internal */
export const StartSearchResponse$inboundSchema: z.ZodMiniType<
  StartSearchResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Search$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function startSearchResponseFromJSON(
  jsonString: string,
): SafeParseResult<StartSearchResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => StartSearchResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'StartSearchResponse' from JSON`,
  );
}
