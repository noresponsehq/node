import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetCustomerExportRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  exportId: string;
};

export type GetCustomerExportResponse = {
  headers: { [k: string]: Array<string> };
  result: models.CustomerExport;
};

/** @internal */
export type GetCustomerExportRequest$Outbound = {
  workspace_id: string;
  export_id: string;
};

/** @internal */
export const GetCustomerExportRequest$outboundSchema: z.ZodMiniType<
  GetCustomerExportRequest$Outbound,
  GetCustomerExportRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    exportId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      exportId: "export_id",
    });
  }),
);

export function getCustomerExportRequestToJSON(
  getCustomerExportRequest: GetCustomerExportRequest,
): string {
  return JSON.stringify(
    GetCustomerExportRequest$outboundSchema.parse(getCustomerExportRequest),
  );
}

/** @internal */
export const GetCustomerExportResponse$inboundSchema: z.ZodMiniType<
  GetCustomerExportResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.CustomerExport$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getCustomerExportResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetCustomerExportResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetCustomerExportResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetCustomerExportResponse' from JSON`,
  );
}
