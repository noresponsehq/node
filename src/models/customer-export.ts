import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  CustomerExportRequestKind,
  CustomerExportRequestKind$inboundSchema,
} from "./customer-export-request-kind.js";
import {
  CustomerExportStatus,
  CustomerExportStatus$inboundSchema,
} from "./customer-export-status.js";
import { Environment, Environment$inboundSchema } from "./environment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { ResponseMode, ResponseMode$inboundSchema } from "./response-mode.js";

/**
 * Request an asynchronous customer export.
 */
export type CustomerExport = {
  id: string;
  kind: CustomerExportRequestKind;
  environment: Environment;
  /**
   * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
   */
  responseMode: ResponseMode;
  status: CustomerExportStatus;
  createdAt: string;
  snapshotAt?: string | undefined;
  expiresAt: string;
  finishedAt?: string | undefined;
  records: number;
  bytes: number;
  chunks: number;
  attempts: number;
  generation: number;
  errorCode?: string | undefined;
  requestSha256: string;
};

/** @internal */
export const CustomerExport$inboundSchema: z.ZodMiniType<
  CustomerExport,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    kind: CustomerExportRequestKind$inboundSchema,
    environment: Environment$inboundSchema,
    response_mode: ResponseMode$inboundSchema,
    status: CustomerExportStatus$inboundSchema,
    created_at: types.string(),
    snapshot_at: types.optional(types.string()),
    expires_at: types.string(),
    finished_at: types.optional(types.string()),
    records: types.number(),
    bytes: types.number(),
    chunks: types.number(),
    attempts: types.number(),
    generation: types.number(),
    error_code: types.optional(types.string()),
    request_sha256: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "response_mode": "responseMode",
      "created_at": "createdAt",
      "snapshot_at": "snapshotAt",
      "expires_at": "expiresAt",
      "finished_at": "finishedAt",
      "error_code": "errorCode",
      "request_sha256": "requestSha256",
    });
  }),
);

export function customerExportFromJSON(
  jsonString: string,
): SafeParseResult<CustomerExport, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CustomerExport$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CustomerExport' from JSON`,
  );
}
