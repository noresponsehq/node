import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetWorkspacePersonRequest = {
  personId: string;
};

export type GetWorkspacePersonResponse = {
  headers: { [k: string]: Array<string> };
  result: models.WorkspacePersonReport;
};

/** @internal */
export type GetWorkspacePersonRequest$Outbound = {
  person_id: string;
};

/** @internal */
export const GetWorkspacePersonRequest$outboundSchema: z.ZodMiniType<
  GetWorkspacePersonRequest$Outbound,
  GetWorkspacePersonRequest
> = z.pipe(
  z.object({
    personId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      personId: "person_id",
    });
  }),
);

export function getWorkspacePersonRequestToJSON(
  getWorkspacePersonRequest: GetWorkspacePersonRequest,
): string {
  return JSON.stringify(
    GetWorkspacePersonRequest$outboundSchema.parse(getWorkspacePersonRequest),
  );
}

/** @internal */
export const GetWorkspacePersonResponse$inboundSchema: z.ZodMiniType<
  GetWorkspacePersonResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.WorkspacePersonReport$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getWorkspacePersonResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetWorkspacePersonResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetWorkspacePersonResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetWorkspacePersonResponse' from JSON`,
  );
}
