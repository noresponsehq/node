import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * covered read at least one profile; none_found looked and found no account; inaccessible found accounts that are private or locked; failed could not finish looking; unavailable has no resolver or collector enabled.
 */
export const ScreeningPlatformCoverageStatus = {
  Covered: "covered",
  NoneFound: "none_found",
  Inaccessible: "inaccessible",
  Failed: "failed",
  Unavailable: "unavailable",
} as const;
/**
 * covered read at least one profile; none_found looked and found no account; inaccessible found accounts that are private or locked; failed could not finish looking; unavailable has no resolver or collector enabled.
 */
export type ScreeningPlatformCoverageStatus = OpenEnum<
  typeof ScreeningPlatformCoverageStatus
>;

/** @internal */
export const ScreeningPlatformCoverageStatus$inboundSchema: z.ZodMiniType<
  ScreeningPlatformCoverageStatus,
  unknown
> = openEnums.inboundSchema(ScreeningPlatformCoverageStatus);
