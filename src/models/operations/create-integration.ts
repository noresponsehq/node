import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateIntegrationResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Integration;
};

/** @internal */
export const CreateIntegrationResponse$inboundSchema: z.ZodMiniType<
  CreateIntegrationResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Integration$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function createIntegrationResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateIntegrationResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateIntegrationResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateIntegrationResponse' from JSON`,
  );
}
