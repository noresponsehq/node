import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListAccountAssessmentsRequest = {
  /**
   * The account_id the tenant sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.
   */
  accountId: string;
  /**
   * Items per page.
   */
  limit?: number | undefined;
  /**
   * next_cursor from the previous page, unchanged.
   */
  cursor?: string | undefined;
  /**
   * Optional standard or separately authorised detailed customer view; raw is rejected.
   */
  responseMode?: models.ResponseMode | undefined;
};

export type ListAccountAssessmentsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AssessmentList;
};

/** @internal */
export type ListAccountAssessmentsRequest$Outbound = {
  account_id: string;
  limit: number;
  cursor?: string | undefined;
  response_mode?: string | undefined;
};

/** @internal */
export const ListAccountAssessmentsRequest$outboundSchema: z.ZodMiniType<
  ListAccountAssessmentsRequest$Outbound,
  ListAccountAssessmentsRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
    limit: z._default(z.int(), 20),
    cursor: z.optional(z.string()),
    responseMode: z.optional(models.ResponseMode$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      responseMode: "response_mode",
    });
  }),
);

export function listAccountAssessmentsRequestToJSON(
  listAccountAssessmentsRequest: ListAccountAssessmentsRequest,
): string {
  return JSON.stringify(
    ListAccountAssessmentsRequest$outboundSchema.parse(
      listAccountAssessmentsRequest,
    ),
  );
}

/** @internal */
export const ListAccountAssessmentsResponse$inboundSchema: z.ZodMiniType<
  ListAccountAssessmentsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AssessmentList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listAccountAssessmentsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListAccountAssessmentsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListAccountAssessmentsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListAccountAssessmentsResponse' from JSON`,
  );
}
