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
  ScreeningPlatformCoverageStatus,
  ScreeningPlatformCoverageStatus$inboundSchema,
} from "./screening-platform-coverage-status.js";

/**
 * What a screening read on one platform.
 */
export type ScreeningPlatformCoverage = {
  /**
   * A platform a screening can cover. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.
   */
  platform: HandlePlatform;
  /**
   * covered read at least one profile; none_found looked and found no account; inaccessible found accounts that are private or locked; failed could not finish looking; unavailable has no resolver or collector enabled.
   */
  status: ScreeningPlatformCoverageStatus;
  accountsFound: number;
  itemsRead: number;
};

/** @internal */
export const ScreeningPlatformCoverage$inboundSchema: z.ZodMiniType<
  ScreeningPlatformCoverage,
  unknown
> = z.pipe(
  z.object({
    platform: HandlePlatform$inboundSchema,
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
