import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  Breach,
  Breach$inboundSchema,
  Breach$Outbound,
  Breach$outboundSchema,
} from "./breach.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  OnlineAccount,
  OnlineAccount$inboundSchema,
  OnlineAccount$Outbound,
  OnlineAccount$outboundSchema,
} from "./online-account.js";
import {
  RiskDetailsAttributeConflict,
  RiskDetailsAttributeConflict$inboundSchema,
  RiskDetailsAttributeConflict$Outbound,
  RiskDetailsAttributeConflict$outboundSchema,
} from "./risk-details-attribute-conflict.js";
import {
  RiskDetailsBreachName,
  RiskDetailsBreachName$inboundSchema,
  RiskDetailsBreachName$Outbound,
  RiskDetailsBreachName$outboundSchema,
} from "./risk-details-breach-name.js";
import {
  RiskDetailsEvent,
  RiskDetailsEvent$inboundSchema,
  RiskDetailsEvent$Outbound,
  RiskDetailsEvent$outboundSchema,
} from "./risk-details-event.js";
import {
  RiskDetailsPhoneName,
  RiskDetailsPhoneName$inboundSchema,
  RiskDetailsPhoneName$Outbound,
  RiskDetailsPhoneName$outboundSchema,
} from "./risk-details-phone-name.js";

/**
 * Detailed view only (response_mode=detailed, which needs the detailed scope); a standard answer leaves it out. Merged observations without provider, source, origin, raw breach record, value or score.
 */
export type RiskDetails = {
  phoneNames?: Array<RiskDetailsPhoneName> | undefined;
  /**
   * The matching breach tables, newest first, at most 100.
   */
  breaches?: Array<Breach> | undefined;
  /**
   * Names found next to the identifiers in breach records, merged, with the number of distinct tables each was seen in and the sites of those tables.
   */
  breachNames?: Array<RiskDetailsBreachName> | undefined;
  /**
   * The identity's dated footprint events, newest first, at most 300: the year and month, what happened (created, last_active, breached), the site, its category, the kind of evidence and the identifier it belongs to. No breach value: dates are coarsened to the month.
   */
  events?: Array<RiskDetailsEvent> | undefined;
  /**
   * Every online-account search of the email or username: the platform, what the search came to and, for an account found, what the platform returned beside it. Found first, then not found, then searches that failed or are still running, each by platform name; at most 64. A failed or running search keeps its own outcome and is not reported as not_found.
   */
  accounts?: Array<OnlineAccount> | undefined;
  /**
   * What an identity_attribute_conflict reason weighed: each attribute the records disagree on and the sites reporting it. Absent when the reason did not fire, and on an answer stored before conflicts were recorded. No value is served.
   */
  attributeConflicts?: Array<RiskDetailsAttributeConflict> | undefined;
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
      events: types.optional(z.array(RiskDetailsEvent$inboundSchema)),
      accounts: types.optional(z.array(OnlineAccount$inboundSchema)),
      attribute_conflicts: types.optional(
        z.array(RiskDetailsAttributeConflict$inboundSchema),
      ),
    }),
    z.transform((v) => {
      return remap$(v, {
        "phone_names": "phoneNames",
        "breach_names": "breachNames",
        "attribute_conflicts": "attributeConflicts",
      });
    }),
  );
/** @internal */
export type RiskDetails$Outbound = {
  phone_names?: Array<RiskDetailsPhoneName$Outbound> | undefined;
  breaches?: Array<Breach$Outbound> | undefined;
  breach_names?: Array<RiskDetailsBreachName$Outbound> | undefined;
  events?: Array<RiskDetailsEvent$Outbound> | undefined;
  accounts?: Array<OnlineAccount$Outbound> | undefined;
  attribute_conflicts?:
    | Array<RiskDetailsAttributeConflict$Outbound>
    | undefined;
};

/** @internal */
export const RiskDetails$outboundSchema: z.ZodMiniType<
  RiskDetails$Outbound,
  RiskDetails
> = z.pipe(
  z.object({
    phoneNames: z.optional(z.array(RiskDetailsPhoneName$outboundSchema)),
    breaches: z.optional(z.array(Breach$outboundSchema)),
    breachNames: z.optional(z.array(RiskDetailsBreachName$outboundSchema)),
    events: z.optional(z.array(RiskDetailsEvent$outboundSchema)),
    accounts: z.optional(z.array(OnlineAccount$outboundSchema)),
    attributeConflicts: z.optional(
      z.array(RiskDetailsAttributeConflict$outboundSchema),
    ),
  }),
  z.transform((v) => {
    return remap$(v, {
      phoneNames: "phone_names",
      breachNames: "breach_names",
      attributeConflicts: "attribute_conflicts",
    });
  }),
);

export function riskDetailsToJSON(riskDetails: RiskDetails): string {
  return JSON.stringify(RiskDetails$outboundSchema.parse(riskDetails));
}
export function riskDetailsFromJSON(
  jsonString: string,
): SafeParseResult<RiskDetails, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskDetails$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskDetails' from JSON`,
  );
}
