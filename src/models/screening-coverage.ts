import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  HandlePlatform,
  HandlePlatform$inboundSchema,
} from "./handle-platform.js";
import {
  ScreeningNotAnalysedCount,
  ScreeningNotAnalysedCount$inboundSchema,
} from "./screening-not-analysed-count.js";
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
   * Items read that the analyser could not analyse. Above zero, the person is partial: a finding may be missing from them.
   */
  itemsNotAnalysed?: number | undefined;
  /**
   * items_not_analysed split by reason, each reason once with at least one item.
   */
  notAnalysedByReason?: Array<ScreeningNotAnalysedCount> | undefined;
  /**
   * The oldest item read on any platform.
   */
  periodFrom?: string | undefined;
  /**
   * The newest item read on any platform.
   */
  periodTo?: string | undefined;
  platforms: Array<ScreeningPlatformCoverage>;
  /**
   * Requested platforms where the person gave the screening nothing to look up, such as no handle for a platform that reads supplied handles only. Nothing looked and nothing failed: such a platform is not in platforms, is not none_found and does not make the person partial.
   */
  notSearched?: Array<HandlePlatform> | undefined;
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
    items_not_analysed: types.optional(types.number()),
    not_analysed_by_reason: types.optional(
      z.array(ScreeningNotAnalysedCount$inboundSchema),
    ),
    period_from: types.optional(types.string()),
    period_to: types.optional(types.string()),
    platforms: z.array(ScreeningPlatformCoverage$inboundSchema),
    not_searched: types.optional(z.array(HandlePlatform$inboundSchema)),
  }),
  z.transform((v) => {
    return remap$(v, {
      "accounts_found": "accountsFound",
      "accounts_accessible": "accountsAccessible",
      "items_read": "itemsRead",
      "items_not_analysed": "itemsNotAnalysed",
      "not_analysed_by_reason": "notAnalysedByReason",
      "period_from": "periodFrom",
      "period_to": "periodTo",
      "not_searched": "notSearched",
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
