import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateListEntryRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  body: models.ListEntryRequest;
};

export type CreateListEntryResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ListEntry;
};

/** @internal */
export type CreateListEntryRequest$Outbound = {
  workspace_id: string;
  environment: string;
  body: models.ListEntryRequest$Outbound;
};

/** @internal */
export const CreateListEntryRequest$outboundSchema: z.ZodMiniType<
  CreateListEntryRequest$Outbound,
  CreateListEntryRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    body: models.ListEntryRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function createListEntryRequestToJSON(
  createListEntryRequest: CreateListEntryRequest,
): string {
  return JSON.stringify(
    CreateListEntryRequest$outboundSchema.parse(createListEntryRequest),
  );
}

/** @internal */
export const CreateListEntryResponse$inboundSchema: z.ZodMiniType<
  CreateListEntryResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ListEntry$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function createListEntryResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateListEntryResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateListEntryResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateListEntryResponse' from JSON`,
  );
}
