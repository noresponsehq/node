import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type StartWorkspacePersonSearchRequest = {
  personId: string;
  /**
   * Opaque request key, 16 to 128 characters. Repeating the key and request returns the same resource in its current state while it is retained. A different request with the same key answers 409. Use a new key for a deliberate new operation. Keys are scoped to the environment and operation; person searches also scope them to the group and person.
   */
  idempotencyKey?: string | undefined;
  body: models.SearchRequest;
};

export type StartWorkspacePersonSearchResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Search;
};

/** @internal */
export type StartWorkspacePersonSearchRequest$Outbound = {
  person_id: string;
  "Idempotency-Key"?: string | undefined;
  body: models.SearchRequest$Outbound;
};

/** @internal */
export const StartWorkspacePersonSearchRequest$outboundSchema: z.ZodMiniType<
  StartWorkspacePersonSearchRequest$Outbound,
  StartWorkspacePersonSearchRequest
> = z.pipe(
  z.object({
    personId: z.string(),
    idempotencyKey: z.optional(z.string()),
    body: models.SearchRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      personId: "person_id",
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function startWorkspacePersonSearchRequestToJSON(
  startWorkspacePersonSearchRequest: StartWorkspacePersonSearchRequest,
): string {
  return JSON.stringify(
    StartWorkspacePersonSearchRequest$outboundSchema.parse(
      startWorkspacePersonSearchRequest,
    ),
  );
}

/** @internal */
export const StartWorkspacePersonSearchResponse$inboundSchema: z.ZodMiniType<
  StartWorkspacePersonSearchResponse,
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

export function startWorkspacePersonSearchResponseFromJSON(
  jsonString: string,
): SafeParseResult<StartWorkspacePersonSearchResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) =>
      StartWorkspacePersonSearchResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'StartWorkspacePersonSearchResponse' from JSON`,
  );
}
