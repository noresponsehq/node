import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningPlatformCoverageStatus,
  ScreeningPlatformCoverageStatus$inboundSchema,
} from "./screening-platform-coverage-status.js";

/**
 * What a screening read on one platform.
 */
export type ScreeningPlatformCoverage = {
  /**
   * A platform a screening can cover, such as instagram, x, bluesky, youtube, tiktok or github. The screening registry owns the set: a request that names a platform it does not cover answers 422. A new platform adds an id without changing this contract, so read a platform you do not know in a response as one you have not seen before, not as an error. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.
   */
  platform: string;
  /**
   * covered read at least one profile; none_found looked and found no account; inaccessible found accounts that are private or locked; failed could not finish looking; unavailable has no resolver or collector enabled.
   */
  status: ScreeningPlatformCoverageStatus;
  /**
   * Accounts found on the platform: at most 5, the best candidates the search kept.
   */
  accountsFound: number;
  itemsRead: number;
};

/** @internal */
export const ScreeningPlatformCoverage$inboundSchema: z.ZodMiniType<
  ScreeningPlatformCoverage,
  unknown
> = z.pipe(
  z.object({
    platform: types.string(),
    status: ScreeningPlatformCoverageStatus$inboundSchema,
    accounts_found: types.number(),
    items_read: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "accounts_found": "accountsFound",
      "items_read": "itemsRead",
    });
  }),
);

export function screeningPlatformCoverageFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningPlatformCoverage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningPlatformCoverage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningPlatformCoverage' from JSON`,
  );
}
