import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CancelCustomerExportRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  exportId: string;
  body: models.CustomerExportActionRequest;
};

export type CancelCustomerExportResponse = {
  headers: { [k: string]: Array<string> };
  result: models.CustomerExport;
};

/** @internal */
export type CancelCustomerExportRequest$Outbound = {
  workspace_id: string;
  export_id: string;
  body: models.CustomerExportActionRequest$Outbound;
};

/** @internal */
export const CancelCustomerExportRequest$outboundSchema: z.ZodMiniType<
  CancelCustomerExportRequest$Outbound,
  CancelCustomerExportRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    exportId: z.string(),
    body: models.CustomerExportActionRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      exportId: "export_id",
    });
  }),
);

export function cancelCustomerExportRequestToJSON(
  cancelCustomerExportRequest: CancelCustomerExportRequest,
): string {
  return JSON.stringify(
    CancelCustomerExportRequest$outboundSchema.parse(
      cancelCustomerExportRequest,
    ),
  );
}

/** @internal */
export const CancelCustomerExportResponse$inboundSchema: z.ZodMiniType<
  CancelCustomerExportResponse,
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

export function cancelCustomerExportResponseFromJSON(
  jsonString: string,
): SafeParseResult<CancelCustomerExportResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CancelCustomerExportResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CancelCustomerExportResponse' from JSON`,
  );
}
