import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetPersonRequest = {
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
};

export type GetPersonResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PersonReport;
};

/** @internal */
export type GetPersonRequest$Outbound = {
  workspace_id: string;
  environment: string;
  group_id: string;
  person_id: string;
};

/** @internal */
export const GetPersonRequest$outboundSchema: z.ZodMiniType<
  GetPersonRequest$Outbound,
  GetPersonRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    groupId: z.string(),
    personId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      groupId: "group_id",
      personId: "person_id",
    });
  }),
);

export function getPersonRequestToJSON(
  getPersonRequest: GetPersonRequest,
): string {
  return JSON.stringify(
    GetPersonRequest$outboundSchema.parse(getPersonRequest),
  );
}

/** @internal */
export const GetPersonResponse$inboundSchema: z.ZodMiniType<
  GetPersonResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.PersonReport$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getPersonResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetPersonResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetPersonResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetPersonResponse' from JSON`,
  );
}
