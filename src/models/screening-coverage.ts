import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningCoverageSources,
  ScreeningCoverageSources$inboundSchema,
} from "./screening-coverage-sources.js";
import {
  ScreeningCoverageTiming,
  ScreeningCoverageTiming$inboundSchema,
} from "./screening-coverage-timing.js";
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
  /**
   * Requested platforms where the person gave the screening nothing to look up, such as no handle for a platform that reads supplied handles only. Nothing looked and nothing failed: such a platform is not in platforms, is not none_found and does not make the person partial.
   */
  notSearched?: Array<string> | undefined;
  /**
   * How many sources this search asked and how many answered, across the lookup stage (sources asked whether an account exists for an identifier) and the platform stage (profiles read on each platform). A source that answered may have found nothing; one that did not answer failed or ran out of time.
   */
  sources?: ScreeningCoverageSources | undefined;
  /**
   * How long this search's latest attempt took, stage by stage. started_at minus the investigation's creation is the time spent queued or retrying.
   */
  timing?: ScreeningCoverageTiming | undefined;
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
    not_searched: types.optional(z.array(types.string())),
    sources: types.optional(ScreeningCoverageSources$inboundSchema),
    timing: types.optional(ScreeningCoverageTiming$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "accounts_found": "accountsFound",
      "accounts_accessible": "accountsAccessible",
      "items_read": "itemsRead",
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
