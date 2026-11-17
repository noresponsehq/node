import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RunWorkspacePersonSearchRequest = {
  personId: string;
  searchId: string;
  body: models.ScreeningCancelRequest;
};

export type RunWorkspacePersonSearchResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Search;
};

/** @internal */
export type RunWorkspacePersonSearchRequest$Outbound = {
  person_id: string;
  search_id: string;
  body: models.ScreeningCancelRequest$Outbound;
};

/** @internal */
export const RunWorkspacePersonSearchRequest$outboundSchema: z.ZodMiniType<
  RunWorkspacePersonSearchRequest$Outbound,
  RunWorkspacePersonSearchRequest
> = z.pipe(
  z.object({
    personId: z.string(),
    searchId: z.string(),
    body: models.ScreeningCancelRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      personId: "person_id",
      searchId: "search_id",
    });
  }),
);

export function runWorkspacePersonSearchRequestToJSON(
  runWorkspacePersonSearchRequest: RunWorkspacePersonSearchRequest,
): string {
  return JSON.stringify(
    RunWorkspacePersonSearchRequest$outboundSchema.parse(
      runWorkspacePersonSearchRequest,
    ),
  );
}

/** @internal */
export const RunWorkspacePersonSearchResponse$inboundSchema: z.ZodMiniType<
  RunWorkspacePersonSearchResponse,
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

export function runWorkspacePersonSearchResponseFromJSON(
  jsonString: string,
): SafeParseResult<RunWorkspacePersonSearchResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RunWorkspacePersonSearchResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RunWorkspacePersonSearchResponse' from JSON`,
  );
}
