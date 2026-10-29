import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListRequestDiagnosticsRequest = {
  /**
   * Inclusive start of a range of at most seven days.
   */
  from: string;
  /**
   * Exclusive end of the range.
   */
  to: string;
  /**
   * Optional filter or paging parameter.
   */
  requestId?: string | undefined;
  /**
   * Optional filter or paging parameter.
   */
  route?: string | undefined;
  /**
   * Optional filter or paging parameter.
   */
  status?: number | undefined;
  /**
   * Optional filter or paging parameter.
   */
  limit?: number | undefined;
  /**
   * Optional filter or paging parameter.
   */
  cursor?: string | undefined;
  /**
   * Filter by the public authenticated API key identifier; older unattributed rows do not match.
   */
  apiKeyId?: string | undefined;
};

export type ListRequestDiagnosticsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.RequestDiagnosticPage;
};

/** @internal */
export type ListRequestDiagnosticsRequest$Outbound = {
  from: string;
  to: string;
  request_id?: string | undefined;
  route?: string | undefined;
  status?: number | undefined;
  limit: number;
  cursor?: string | undefined;
  api_key_id?: string | undefined;
};

/** @internal */
export const ListRequestDiagnosticsRequest$outboundSchema: z.ZodMiniType<
  ListRequestDiagnosticsRequest$Outbound,
  ListRequestDiagnosticsRequest
> = z.pipe(
  z.object({
    from: z.string(),
    to: z.string(),
    requestId: z.optional(z.string()),
    route: z.optional(z.string()),
    status: z.optional(z.int()),
    limit: z._default(z.int(), 50),
    cursor: z.optional(z.string()),
    apiKeyId: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      requestId: "request_id",
      apiKeyId: "api_key_id",
    });
  }),
);

export function listRequestDiagnosticsRequestToJSON(
  listRequestDiagnosticsRequest: ListRequestDiagnosticsRequest,
): string {
  return JSON.stringify(
    ListRequestDiagnosticsRequest$outboundSchema.parse(
      listRequestDiagnosticsRequest,
    ),
  );
}

/** @internal */
export const ListRequestDiagnosticsResponse$inboundSchema: z.ZodMiniType<
  ListRequestDiagnosticsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.RequestDiagnosticPage$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listRequestDiagnosticsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListRequestDiagnosticsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListRequestDiagnosticsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListRequestDiagnosticsResponse' from JSON`,
  );
}
