import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningSpendLine,
  ScreeningSpendLine$inboundSchema,
} from "./screening-spend-line.js";

/**
 * What screening cost, in US cents, in total and per implementation.
 */
export type ScreeningSpend = {
  /**
   * The total, in US cents.
   */
  totalMinor: number;
  byImplementation: Array<ScreeningSpendLine>;
};

/** @internal */
export const ScreeningSpend$inboundSchema: z.ZodMiniType<
  ScreeningSpend,
  unknown
> = z.pipe(
  z.object({
    total_minor: types.number(),
    by_implementation: z.array(ScreeningSpendLine$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "total_minor": "totalMinor",
      "by_implementation": "byImplementation",
    });
  }),
);

export function screeningSpendFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningSpend, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningSpend$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningSpend' from JSON`,
  );
}
