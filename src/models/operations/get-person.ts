import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetPersonRequest = {
  groupId: string;
  personId: string;
};

export type GetPersonResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PersonReport;
};

/** @internal */
export type GetPersonRequest$Outbound = {
  group_id: string;
  person_id: string;
};

/** @internal */
export const GetPersonRequest$outboundSchema: z.ZodMiniType<
  GetPersonRequest$Outbound,
  GetPersonRequest
> = z.pipe(
  z.object({
    groupId: z.string(),
    personId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
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
