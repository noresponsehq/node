import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Breach, Breach$inboundSchema } from "./breach.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  RiskDetailsBreachName,
  RiskDetailsBreachName$inboundSchema,
} from "./risk-details-breach-name.js";
import {
  RiskDetailsPhoneName,
  RiskDetailsPhoneName$inboundSchema,
} from "./risk-details-phone-name.js";

/**
 * Detailed view only (response_mode=detailed, which needs the detailed scope); a standard answer leaves it out. Merged observations without provider, source, origin, raw breach record, value or score.
 */
export type RiskDetails = {
  phoneNames?: Array<RiskDetailsPhoneName> | undefined;
  /**
   * The matching breach tables, newest first, at most 50.
   */
  breaches?: Array<Breach> | undefined;
  /**
   * Names found next to the identifiers in breach records, merged, with the number of distinct tables each was seen in.
   */
  breachNames?: Array<RiskDetailsBreachName> | undefined;
};

/** @internal */
export const RiskDetails$inboundSchema: z.ZodMiniType<RiskDetails, unknown> = z
  .pipe(
    z.object({
      phone_names: types.optional(z.array(RiskDetailsPhoneName$inboundSchema)),
      breaches: types.optional(z.array(Breach$inboundSchema)),
      breach_names: types.optional(
        z.array(RiskDetailsBreachName$inboundSchema),
      ),
    }),
    z.transform((v) => {
      return remap$(v, {
        "phone_names": "phoneNames",
        "breach_names": "breachNames",
      });
    }),
  );

export function riskDetailsFromJSON(
  jsonString: string,
): SafeParseResult<RiskDetails, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskDetails$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskDetails' from JSON`,
  );
}
