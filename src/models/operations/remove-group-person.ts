import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";

export type RemoveGroupPersonRequest = {
  groupId: string;
  personId: string;
};

export type RemoveGroupPersonResponse = {
  headers: { [k: string]: Array<string> };
};

/** @internal */
export type RemoveGroupPersonRequest$Outbound = {
  group_id: string;
  person_id: string;
};

/** @internal */
export const RemoveGroupPersonRequest$outboundSchema: z.ZodMiniType<
  RemoveGroupPersonRequest$Outbound,
  RemoveGroupPersonRequest
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

export function removeGroupPersonRequestToJSON(
  removeGroupPersonRequest: RemoveGroupPersonRequest,
): string {
  return JSON.stringify(
    RemoveGroupPersonRequest$outboundSchema.parse(removeGroupPersonRequest),
  );
}

/** @internal */
export const RemoveGroupPersonResponse$inboundSchema: z.ZodMiniType<
  RemoveGroupPersonResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
    });
  }),
);

export function removeGroupPersonResponseFromJSON(
  jsonString: string,
): SafeParseResult<RemoveGroupPersonResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RemoveGroupPersonResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RemoveGroupPersonResponse' from JSON`,
  );
}
