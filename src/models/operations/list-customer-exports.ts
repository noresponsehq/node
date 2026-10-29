import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListCustomerExportsRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  kind: models.CustomerExportRequestKind;
  environment: models.Environment;
  limit?: number | undefined;
  cursor?: string | undefined;
};

export type ListCustomerExportsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.CustomerExportList;
};

/** @internal */
export type ListCustomerExportsRequest$Outbound = {
  workspace_id: string;
  kind: string;
  environment: string;
  limit: number;
  cursor?: string | undefined;
};

/** @internal */
export const ListCustomerExportsRequest$outboundSchema: z.ZodMiniType<
  ListCustomerExportsRequest$Outbound,
  ListCustomerExportsRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    kind: models.CustomerExportRequestKind$outboundSchema,
    environment: models.Environment$outboundSchema,
    limit: z._default(z.int(), 25),
    cursor: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function listCustomerExportsRequestToJSON(
  listCustomerExportsRequest: ListCustomerExportsRequest,
): string {
  return JSON.stringify(
    ListCustomerExportsRequest$outboundSchema.parse(listCustomerExportsRequest),
  );
}

/** @internal */
export const ListCustomerExportsResponse$inboundSchema: z.ZodMiniType<
  ListCustomerExportsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.CustomerExportList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listCustomerExportsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListCustomerExportsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListCustomerExportsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListCustomerExportsResponse' from JSON`,
  );
}
