import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type RotateApiKeyResponse = {
  headers: { [k: string]: Array<string> };
  result: models.KeyRotation;
};

/** @internal */
export const RotateApiKeyResponse$inboundSchema: z.ZodMiniType<
  RotateApiKeyResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.KeyRotation$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function rotateApiKeyResponseFromJSON(
  jsonString: string,
): SafeParseResult<RotateApiKeyResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RotateApiKeyResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RotateApiKeyResponse' from JSON`,
  );
}
