import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import {
  AccountDecision,
  AccountDecision$inboundSchema,
} from "./account-decision.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The decision for each flow. Every flow uses the tenant's signup thresholds today, so all three equal risk.decision.
 */
export type AccountDecisionsByFlow = {
  /**
   * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.
   */
  signup: AccountDecision;
  /**
   * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.
   */
  login: AccountDecision;
  /**
   * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.
   */
  purchase: AccountDecision;
};

/** @internal */
export const AccountDecisionsByFlow$inboundSchema: z.ZodMiniType<
  AccountDecisionsByFlow,
  unknown
> = z.object({
  signup: AccountDecision$inboundSchema,
  login: AccountDecision$inboundSchema,
  purchase: AccountDecision$inboundSchema,
});

export function accountDecisionsByFlowFromJSON(
  jsonString: string,
): SafeParseResult<AccountDecisionsByFlow, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountDecisionsByFlow$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountDecisionsByFlow' from JSON`,
  );
}
