import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  DecisionReceipt,
  DecisionReceipt$inboundSchema,
} from "./decision-receipt.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * One authenticated HTTP attempt. An attempt id is independent of the caller correlation id. No raw body, path parameter, credential or source payload is retained. write_complete means the server wrote/flushed its response, not proof the client processed it. Collection is bounded best effort; ii_signup_request_diagnostic_failures_total exposes gaps. Retained for seven days or the shorter environment retention.
 */
export type RequestDiagnostic = {
  id: string;
  requestId: string;
  route: string;
  httpStatus: number;
  durationMs: number;
  startedAt: string;
  completedAt: string;
  expiresAt: string;
  errorCode?: string | undefined;
  idempotentReplayed: boolean;
  writeComplete: boolean;
  /**
   * The decision prepared for one HTTP attempt. Its account field preserves the account decision returned for that attempt, even after subsequent changes.
   */
  decision?: DecisionReceipt | undefined;
};

/** @internal */
export const RequestDiagnostic$inboundSchema: z.ZodMiniType<
  RequestDiagnostic,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    request_id: types.string(),
    route: types.string(),
    http_status: types.number(),
    duration_ms: types.number(),
    started_at: types.string(),
    completed_at: types.string(),
    expires_at: types.string(),
    error_code: types.optional(types.string()),
    idempotent_replayed: types.boolean(),
    write_complete: types.boolean(),
    decision: types.optional(DecisionReceipt$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "request_id": "requestId",
      "http_status": "httpStatus",
      "duration_ms": "durationMs",
      "started_at": "startedAt",
      "completed_at": "completedAt",
      "expires_at": "expiresAt",
      "error_code": "errorCode",
      "idempotent_replayed": "idempotentReplayed",
      "write_complete": "writeComplete",
    });
  }),
);

export function requestDiagnosticFromJSON(
  jsonString: string,
): SafeParseResult<RequestDiagnostic, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RequestDiagnostic$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RequestDiagnostic' from JSON`,
  );
}
