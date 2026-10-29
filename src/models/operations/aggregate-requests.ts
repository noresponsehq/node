import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type AggregateRequestsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.OperationalAggregate;
};

/** @internal */
export const AggregateRequestsResponse$inboundSchema: z.ZodMiniType<
  AggregateRequestsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.OperationalAggregate$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function aggregateRequestsResponseFromJSON(
  jsonString: string,
): SafeParseResult<AggregateRequestsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AggregateRequestsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AggregateRequestsResponse' from JSON`,
  );
}
