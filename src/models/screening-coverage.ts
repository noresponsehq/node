import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningPlatformCoverage,
  ScreeningPlatformCoverage$inboundSchema,
} from "./screening-platform-coverage.js";

/**
 * The denominator of a screening: accounts found, how many could be read, items read and the period they span, so a clean result is distinct from a person nobody could see.
 */
export type ScreeningCoverage = {
  accountsFound: number;
  accountsAccessible: number;
  itemsRead: number;
  /**
   * The oldest item read on any platform.
   */
  periodFrom?: string | undefined;
  /**
   * The newest item read on any platform.
   */
  periodTo?: string | undefined;
  platforms: Array<ScreeningPlatformCoverage>;
};

/** @internal */
export const ScreeningCoverage$inboundSchema: z.ZodMiniType<
  ScreeningCoverage,
  unknown
> = z.pipe(
  z.object({
    accounts_found: types.number(),
    accounts_accessible: types.number(),
    items_read: types.number(),
    period_from: types.optional(types.string()),
    period_to: types.optional(types.string()),
    platforms: z.array(ScreeningPlatformCoverage$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "accounts_found": "accountsFound",
      "accounts_accessible": "accountsAccessible",
      "items_read": "itemsRead",
      "period_from": "periodFrom",
      "period_to": "periodTo",
    });
  }),
);

export function screeningCoverageFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningCoverage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningCoverage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningCoverage' from JSON`,
  );
}
