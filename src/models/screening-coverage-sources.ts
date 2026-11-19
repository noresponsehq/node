import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { SourceCount, SourceCount$inboundSchema } from "./source-count.js";

/**
 * How many sources this search asked and how many answered, across the lookup stage (sources asked whether an account exists for an identifier) and the platform stage (profiles read on each platform). A source that answered may have found nothing; one that did not answer failed or ran out of time.
 */
export type ScreeningCoverageSources = {
  /**
   * Lookup sources plus platforms asked.
   */
  asked: number;
  /**
   * Lookup sources plus platforms that answered.
   */
  answered: number;
  lookups: SourceCount;
  platforms: SourceCount;
};

/** @internal */
export const ScreeningCoverageSources$inboundSchema: z.ZodMiniType<
  ScreeningCoverageSources,
  unknown
> = z.object({
  asked: types.number(),
  answered: types.number(),
  lookups: SourceCount$inboundSchema,
  platforms: SourceCount$inboundSchema,
});

export function screeningCoverageSourcesFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningCoverageSources, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningCoverageSources$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningCoverageSources' from JSON`,
  );
}
