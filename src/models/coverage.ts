import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Counts only; a zero denominator means no eligible retained records and does not imply a zero rate.
 */
export type Coverage = {
  numerator: number;
  denominator: number;
};

/** @internal */
export const Coverage$inboundSchema: z.ZodMiniType<Coverage, unknown> = z
  .object({
    numerator: types.number(),
    denominator: types.number(),
  });

export function coverageFromJSON(
  jsonString: string,
): SafeParseResult<Coverage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Coverage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Coverage' from JSON`,
  );
}
