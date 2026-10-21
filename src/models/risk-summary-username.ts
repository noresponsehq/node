import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  BreachSummary,
  BreachSummary$inboundSchema,
} from "./breach-summary.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type RiskSummaryUsername = {
  /**
   * Accounts found for the username.
   */
  accountsFound?: number | undefined;
  /**
   * Breach facts for one selector. found is the one required member: false is a definite 'in no breach table'. Every other member is optional, and absent makes no claim. No member carries a breach value, password or hash, and unknown members are refused. truncated means the value matched more tables or records than the lookup keeps, so absence-based claims (a missing name match, for example) are withheld; a truncated result is always found.
   */
  breach?: BreachSummary | undefined;
};

/** @internal */
export const RiskSummaryUsername$inboundSchema: z.ZodMiniType<
  RiskSummaryUsername,
  unknown
> = z.pipe(
  z.object({
    accounts_found: types.optional(types.number()),
    breach: types.optional(BreachSummary$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "accounts_found": "accountsFound",
    });
  }),
);

export function riskSummaryUsernameFromJSON(
  jsonString: string,
): SafeParseResult<RiskSummaryUsername, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskSummaryUsername$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskSummaryUsername' from JSON`,
  );
}
