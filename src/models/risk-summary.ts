import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  Consistency,
  Consistency$inboundSchema,
  Consistency$Outbound,
  Consistency$outboundSchema,
} from "./consistency.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  Footprint,
  Footprint$inboundSchema,
  Footprint$Outbound,
  Footprint$outboundSchema,
} from "./footprint.js";
import {
  IpSummary,
  IpSummary$inboundSchema,
  IpSummary$Outbound,
  IpSummary$outboundSchema,
} from "./ip-summary.js";
import {
  RiskSummaryEmail,
  RiskSummaryEmail$inboundSchema,
  RiskSummaryEmail$Outbound,
  RiskSummaryEmail$outboundSchema,
} from "./risk-summary-email.js";
import {
  RiskSummaryPhone,
  RiskSummaryPhone$inboundSchema,
  RiskSummaryPhone$Outbound,
  RiskSummaryPhone$outboundSchema,
} from "./risk-summary-phone.js";
import {
  RiskSummaryUsername,
  RiskSummaryUsername$inboundSchema,
  RiskSummaryUsername$Outbound,
  RiskSummaryUsername$outboundSchema,
} from "./risk-summary-username.js";

/**
 * A few typed facts per identifier. Every fact is optional: absent means the evidence did not answer and makes no claim, while false or 0 is a definite answer. Lanes that do not exist yet leave their members absent.
 */
export type RiskSummary = {
  phone?: RiskSummaryPhone | undefined;
  email?: RiskSummaryEmail | undefined;
  username?: RiskSummaryUsername | undefined;
  /**
   * Facts about the submitted IP from the offline database and this workspace's own recent assessments. Every member is optional; absent makes no claim.
   */
  ip?: IpSummary | undefined;
  /**
   * Cross-identifier agreement, computed from facts only. Every member is optional; absent makes no claim.
   */
  consistency?: Consistency | undefined;
  /**
   * How long and how widely the signup's email and username have existed, and how far independent sources agree on the person behind them, in years and counts only. families are the kinds of evidence that found either identifier. Omitted when nothing found them: a footprint lookup that failed makes no claim, and absence is no_digital_footprint's to state.
   */
  footprint?: Footprint | undefined;
};

/** @internal */
export const RiskSummary$inboundSchema: z.ZodMiniType<RiskSummary, unknown> = z
  .object({
    phone: types.optional(RiskSummaryPhone$inboundSchema),
    email: types.optional(RiskSummaryEmail$inboundSchema),
    username: types.optional(RiskSummaryUsername$inboundSchema),
    ip: types.optional(IpSummary$inboundSchema),
    consistency: types.optional(Consistency$inboundSchema),
    footprint: types.optional(Footprint$inboundSchema),
  });
/** @internal */
export type RiskSummary$Outbound = {
  phone?: RiskSummaryPhone$Outbound | undefined;
  email?: RiskSummaryEmail$Outbound | undefined;
  username?: RiskSummaryUsername$Outbound | undefined;
  ip?: IpSummary$Outbound | undefined;
  consistency?: Consistency$Outbound | undefined;
  footprint?: Footprint$Outbound | undefined;
};

/** @internal */
export const RiskSummary$outboundSchema: z.ZodMiniType<
  RiskSummary$Outbound,
  RiskSummary
> = z.object({
  phone: z.optional(RiskSummaryPhone$outboundSchema),
  email: z.optional(RiskSummaryEmail$outboundSchema),
  username: z.optional(RiskSummaryUsername$outboundSchema),
  ip: z.optional(IpSummary$outboundSchema),
  consistency: z.optional(Consistency$outboundSchema),
  footprint: z.optional(Footprint$outboundSchema),
});

export function riskSummaryToJSON(riskSummary: RiskSummary): string {
  return JSON.stringify(RiskSummary$outboundSchema.parse(riskSummary));
}
export function riskSummaryFromJSON(
  jsonString: string,
): SafeParseResult<RiskSummary, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskSummary$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskSummary' from JSON`,
  );
}
