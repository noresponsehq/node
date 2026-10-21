import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type ProblemInvalidParam = {
  field: string;
  reason: string;
  example?: string | undefined;
};

/** @internal */
export const ProblemInvalidParam$inboundSchema: z.ZodMiniType<
  ProblemInvalidParam,
  unknown
> = z.object({
  field: types.string(),
  reason: types.string(),
  example: types.optional(types.string()),
});

export function problemInvalidParamFromJSON(
  jsonString: string,
): SafeParseResult<ProblemInvalidParam, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ProblemInvalidParam$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ProblemInvalidParam' from JSON`,
  );
}
