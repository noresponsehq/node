import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type DownloadCustomerExportChunkRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  exportId: string;
  chunkIndex: number;
};

export type DownloadCustomerExportChunkResponse = {
  headers: { [k: string]: Array<string> };
  result: models.CustomerExportChunk;
};

/** @internal */
export type DownloadCustomerExportChunkRequest$Outbound = {
  workspace_id: string;
  export_id: string;
  chunk_index: number;
};

/** @internal */
export const DownloadCustomerExportChunkRequest$outboundSchema: z.ZodMiniType<
  DownloadCustomerExportChunkRequest$Outbound,
  DownloadCustomerExportChunkRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    exportId: z.string(),
    chunkIndex: z.int(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      exportId: "export_id",
      chunkIndex: "chunk_index",
    });
  }),
);

export function downloadCustomerExportChunkRequestToJSON(
  downloadCustomerExportChunkRequest: DownloadCustomerExportChunkRequest,
): string {
  return JSON.stringify(
    DownloadCustomerExportChunkRequest$outboundSchema.parse(
      downloadCustomerExportChunkRequest,
    ),
  );
}

/** @internal */
export const DownloadCustomerExportChunkResponse$inboundSchema: z.ZodMiniType<
  DownloadCustomerExportChunkResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.CustomerExportChunk$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function downloadCustomerExportChunkResponseFromJSON(
  jsonString: string,
): SafeParseResult<DownloadCustomerExportChunkResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) =>
      DownloadCustomerExportChunkResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DownloadCustomerExportChunkResponse' from JSON`,
  );
}
