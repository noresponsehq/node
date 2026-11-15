import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListInvestigationsRequest = {
  personId?: string | undefined;
  before?: string | undefined;
  limit?: number | undefined;
};

export type ListInvestigationsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.InvestigationsList;
};

/** @internal */
export type ListInvestigationsRequest$Outbound = {
  person_id?: string | undefined;
  before?: string | undefined;
  limit: number;
};

/** @internal */
export const ListInvestigationsRequest$outboundSchema: z.ZodMiniType<
  ListInvestigationsRequest$Outbound,
  ListInvestigationsRequest
> = z.pipe(
  z.object({
    personId: z.optional(z.string()),
    before: z.optional(z.string()),
    limit: z._default(z.int(), 100),
  }),
  z.transform((v) => {
    return remap$(v, {
      personId: "person_id",
    });
  }),
);

export function listInvestigationsRequestToJSON(
  listInvestigationsRequest: ListInvestigationsRequest,
): string {
  return JSON.stringify(
    ListInvestigationsRequest$outboundSchema.parse(listInvestigationsRequest),
  );
}

/** @internal */
export const ListInvestigationsResponse$inboundSchema: z.ZodMiniType<
  ListInvestigationsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.InvestigationsList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listInvestigationsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListInvestigationsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListInvestigationsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListInvestigationsResponse' from JSON`,
  );
}
