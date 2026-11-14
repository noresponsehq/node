import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RunSearchRequest = {
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
  searchId: string;
  body: models.ScreeningCancelRequest;
};

export type RunSearchResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Search;
};

/** @internal */
export type RunSearchRequest$Outbound = {
  workspace_id: string;
  environment: string;
  group_id: string;
  person_id: string;
  search_id: string;
  body: models.ScreeningCancelRequest$Outbound;
};

/** @internal */
export const RunSearchRequest$outboundSchema: z.ZodMiniType<
  RunSearchRequest$Outbound,
  RunSearchRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    groupId: z.string(),
    personId: z.string(),
    searchId: z.string(),
    body: models.ScreeningCancelRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      groupId: "group_id",
      personId: "person_id",
      searchId: "search_id",
    });
  }),
);

export function runSearchRequestToJSON(
  runSearchRequest: RunSearchRequest,
): string {
  return JSON.stringify(
    RunSearchRequest$outboundSchema.parse(runSearchRequest),
  );
}

/** @internal */
export const RunSearchResponse$inboundSchema: z.ZodMiniType<
  RunSearchResponse,
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

export function runSearchResponseFromJSON(
  jsonString: string,
): SafeParseResult<RunSearchResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RunSearchResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RunSearchResponse' from JSON`,
  );
}
