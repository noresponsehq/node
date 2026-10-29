import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type AggregateWebhooksResponse = {
  headers: { [k: string]: Array<string> };
  result: models.OperationalAggregate;
};

/** @internal */
export const AggregateWebhooksResponse$inboundSchema: z.ZodMiniType<
  AggregateWebhooksResponse,
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

export function aggregateWebhooksResponseFromJSON(
  jsonString: string,
): SafeParseResult<AggregateWebhooksResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AggregateWebhooksResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AggregateWebhooksResponse' from JSON`,
  );
}
