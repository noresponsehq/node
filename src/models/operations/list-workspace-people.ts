import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListWorkspacePeopleRequest = {
  limit?: number | undefined;
  /**
   * Pass next_cursor from the prior page.
   */
  after?: string | undefined;
};

export type ListWorkspacePeopleResponse = {
  headers: { [k: string]: Array<string> };
  result: models.WorkspacePeopleList;
};

/** @internal */
export type ListWorkspacePeopleRequest$Outbound = {
  limit: number;
  after?: string | undefined;
};

/** @internal */
export const ListWorkspacePeopleRequest$outboundSchema: z.ZodMiniType<
  ListWorkspacePeopleRequest$Outbound,
  ListWorkspacePeopleRequest
> = z.object({
  limit: z._default(z.int(), 100),
  after: z.optional(z.string()),
});

export function listWorkspacePeopleRequestToJSON(
  listWorkspacePeopleRequest: ListWorkspacePeopleRequest,
): string {
  return JSON.stringify(
    ListWorkspacePeopleRequest$outboundSchema.parse(listWorkspacePeopleRequest),
  );
}

/** @internal */
export const ListWorkspacePeopleResponse$inboundSchema: z.ZodMiniType<
  ListWorkspacePeopleResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.WorkspacePeopleList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listWorkspacePeopleResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListWorkspacePeopleResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListWorkspacePeopleResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListWorkspacePeopleResponse' from JSON`,
  );
}
