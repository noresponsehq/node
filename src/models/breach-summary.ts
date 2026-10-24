import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  BreachExposed,
  BreachExposed$inboundSchema,
  BreachExposed$outboundSchema,
} from "./breach-exposed.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Breach facts for one selector. found is the one required member: false is a definite 'in no breach table'. Every other member is optional, and absent makes no claim. No member carries a breach value, password or hash, and unknown members are refused. truncated means the value matched more tables or records than the lookup keeps, so absence-based claims (a missing name match, for example) are withheld; a truncated result is always found.
 */
export type BreachSummary = {
  found: boolean;
  /**
   * Distinct breach tables the value appears in.
   */
  breachCount?: number | undefined;
  /**
   * Year of the oldest dated table.
   */
  firstYear?: number | undefined;
  /**
   * Year of the newest dated table.
   */
  lastYear?: number | undefined;
  /**
   * The union of data kinds the matching tables held, without the values.
   */
  exposed?: Array<BreachExposed> | undefined;
  /**
   * The value is in a credential_list or stealer_log table.
   */
  inCredentialLists?: boolean | undefined;
  /**
   * A plaintext password sat next to the value in a table dated two years ago or less, or the value is in a stealer_log table.
   */
  recentPasswordExposure?: boolean | undefined;
  truncated?: boolean | undefined;
};

/** @internal */
export const BreachSummary$inboundSchema: z.ZodMiniType<
  BreachSummary,
  unknown
> = z.pipe(
  z.object({
    found: types.boolean(),
    breach_count: types.optional(types.number()),
    first_year: types.optional(types.number()),
    last_year: types.optional(types.number()),
    exposed: types.optional(z.array(BreachExposed$inboundSchema)),
    in_credential_lists: types.optional(types.boolean()),
    recent_password_exposure: types.optional(types.boolean()),
    truncated: types.optional(types.boolean()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "breach_count": "breachCount",
      "first_year": "firstYear",
      "last_year": "lastYear",
      "in_credential_lists": "inCredentialLists",
      "recent_password_exposure": "recentPasswordExposure",
    });
  }),
);
/** @internal */
export type BreachSummary$Outbound = {
  found: boolean;
  breach_count?: number | undefined;
  first_year?: number | undefined;
  last_year?: number | undefined;
  exposed?: Array<string> | undefined;
  in_credential_lists?: boolean | undefined;
  recent_password_exposure?: boolean | undefined;
  truncated?: boolean | undefined;
};

/** @internal */
export const BreachSummary$outboundSchema: z.ZodMiniType<
  BreachSummary$Outbound,
  BreachSummary
> = z.pipe(
  z.object({
    found: z.boolean(),
    breachCount: z.optional(z.int()),
    firstYear: z.optional(z.int()),
    lastYear: z.optional(z.int()),
    exposed: z.optional(z.array(BreachExposed$outboundSchema)),
    inCredentialLists: z.optional(z.boolean()),
    recentPasswordExposure: z.optional(z.boolean()),
    truncated: z.optional(z.boolean()),
  }),
  z.transform((v) => {
    return remap$(v, {
      breachCount: "breach_count",
      firstYear: "first_year",
      lastYear: "last_year",
      inCredentialLists: "in_credential_lists",
      recentPasswordExposure: "recent_password_exposure",
    });
  }),
);

export function breachSummaryToJSON(breachSummary: BreachSummary): string {
  return JSON.stringify(BreachSummary$outboundSchema.parse(breachSummary));
}
export function breachSummaryFromJSON(
  jsonString: string,
): SafeParseResult<BreachSummary, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => BreachSummary$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'BreachSummary' from JSON`,
  );
}
