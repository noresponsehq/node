import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Consistency, Consistency$inboundSchema } from "./consistency.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { IpSummary, IpSummary$inboundSchema } from "./ip-summary.js";
import {
  RiskSummaryEmail,
  RiskSummaryEmail$inboundSchema,
} from "./risk-summary-email.js";
import {
  RiskSummaryPhone,
  RiskSummaryPhone$inboundSchema,
} from "./risk-summary-phone.js";
import {
  RiskSummaryUsername,
  RiskSummaryUsername$inboundSchema,
} from "./risk-summary-username.js";

/**
 * A few typed facts per identifier. Every fact is optional: absent means the evidence did not answer and makes no claim, while false or 0 is a definite answer. Lanes that do not exist yet leave their members absent.
 */
export type RiskSummary = {
  phone?: RiskSummaryPhone | undefined;
  email?: RiskSummaryEmail | undefined;
  username?: RiskSummaryUsername | undefined;
  /**
   * Facts about the submitted IP from the offline database and this tenant's own recent assessments. Every member is optional; absent makes no claim.
   */
  ip?: IpSummary | undefined;
  /**
   * Cross-identifier agreement, computed from facts only. Every member is optional; absent makes no claim.
   */
  consistency?: Consistency | undefined;
};

/** @internal */
export const RiskSummary$inboundSchema: z.ZodMiniType<RiskSummary, unknown> = z
  .object({
    phone: types.optional(RiskSummaryPhone$inboundSchema),
    email: types.optional(RiskSummaryEmail$inboundSchema),
    username: types.optional(RiskSummaryUsername$inboundSchema),
    ip: types.optional(IpSummary$inboundSchema),
    consistency: types.optional(Consistency$inboundSchema),
  });

export function riskSummaryFromJSON(
  jsonString: string,
): SafeParseResult<RiskSummary, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskSummary$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskSummary' from JSON`,
  );
}
