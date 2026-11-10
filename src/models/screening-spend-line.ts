import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningSpendLineRole,
  ScreeningSpendLineRole$inboundSchema,
} from "./screening-spend-line-role.js";

/**
 * What one implementation cost.
 */
export type ScreeningSpendLine = {
  /**
   * The resolver, collector or analyser that produced a record, by its catalogue name.
   */
  implementation: string;
  role: ScreeningSpendLineRole;
  spendMinor: number;
};

/** @internal */
export const ScreeningSpendLine$inboundSchema: z.ZodMiniType<
  ScreeningSpendLine,
  unknown
> = z.pipe(
  z.object({
    implementation: types.string(),
    role: ScreeningSpendLineRole$inboundSchema,
    spend_minor: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "spend_minor": "spendMinor",
    });
  }),
);

export function screeningSpendLineFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningSpendLine, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningSpendLine$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningSpendLine' from JSON`,
  );
}
