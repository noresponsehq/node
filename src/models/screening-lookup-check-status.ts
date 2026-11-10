import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * found: a source found the identifier. not_found: every source answered and none found it. partial: the sources that answered found nothing and the others did not answer. not_covered: no source answered. A lookup that failed reads partial or not_covered, not not_found.
 */
export const ScreeningLookupCheckStatus = {
  Found: "found",
  NotFound: "not_found",
  Partial: "partial",
  NotCovered: "not_covered",
} as const;
/**
 * found: a source found the identifier. not_found: every source answered and none found it. partial: the sources that answered found nothing and the others did not answer. not_covered: no source answered. A lookup that failed reads partial or not_covered, not not_found.
 */
export type ScreeningLookupCheckStatus = OpenEnum<
  typeof ScreeningLookupCheckStatus
>;

/** @internal */
export const ScreeningLookupCheckStatus$inboundSchema: z.ZodMiniType<
  ScreeningLookupCheckStatus,
  unknown
> = openEnums.inboundSchema(ScreeningLookupCheckStatus);
