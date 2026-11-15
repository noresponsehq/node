import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";

export type DeleteWorkspacePersonRequest = {
  personId: string;
};

export type DeleteWorkspacePersonResponse = {
  headers: { [k: string]: Array<string> };
};

/** @internal */
export type DeleteWorkspacePersonRequest$Outbound = {
  person_id: string;
};

/** @internal */
export const DeleteWorkspacePersonRequest$outboundSchema: z.ZodMiniType<
  DeleteWorkspacePersonRequest$Outbound,
  DeleteWorkspacePersonRequest
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

export function deleteWorkspacePersonRequestToJSON(
  deleteWorkspacePersonRequest: DeleteWorkspacePersonRequest,
): string {
  return JSON.stringify(
    DeleteWorkspacePersonRequest$outboundSchema.parse(
      deleteWorkspacePersonRequest,
    ),
  );
}

/** @internal */
export const DeleteWorkspacePersonResponse$inboundSchema: z.ZodMiniType<
  DeleteWorkspacePersonResponse,
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

export function deleteWorkspacePersonResponseFromJSON(
  jsonString: string,
): SafeParseResult<DeleteWorkspacePersonResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DeleteWorkspacePersonResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DeleteWorkspacePersonResponse' from JSON`,
  );
}
