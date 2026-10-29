import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RetryCustomerExportRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  exportId: string;
  body: models.CustomerExportActionRequest;
};

export type RetryCustomerExportResponse = {
  headers: { [k: string]: Array<string> };
  result: models.CustomerExport;
};

/** @internal */
export type RetryCustomerExportRequest$Outbound = {
  workspace_id: string;
  export_id: string;
  body: models.CustomerExportActionRequest$Outbound;
};

/** @internal */
export const RetryCustomerExportRequest$outboundSchema: z.ZodMiniType<
  RetryCustomerExportRequest$Outbound,
  RetryCustomerExportRequest
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

export function retryCustomerExportRequestToJSON(
  retryCustomerExportRequest: RetryCustomerExportRequest,
): string {
  return JSON.stringify(
    RetryCustomerExportRequest$outboundSchema.parse(retryCustomerExportRequest),
  );
}

/** @internal */
export const RetryCustomerExportResponse$inboundSchema: z.ZodMiniType<
  RetryCustomerExportResponse,
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

export function retryCustomerExportResponseFromJSON(
  jsonString: string,
): SafeParseResult<RetryCustomerExportResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RetryCustomerExportResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RetryCustomerExportResponse' from JSON`,
  );
}
