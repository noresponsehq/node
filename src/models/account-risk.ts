import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountDecision,
  AccountDecision$inboundSchema,
} from "./account-decision.js";
import {
  AccountRiskReason,
  AccountRiskReason$inboundSchema,
} from "./account-risk-reason.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AccountRisk = {
  /**
   * 0 (safe) to 100 (risky), as risk.score of the assessment.
   */
  score: number;
  /**
   * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.
   */
  decision: AccountDecision;
  /**
   * Every reason that fired, highest weight first. The weights sum to score before clamping.
   */
  reasons: Array<AccountRiskReason>;
};

/** @internal */
export const AccountRisk$inboundSchema: z.ZodMiniType<AccountRisk, unknown> = z
  .object({
    score: types.number(),
    decision: AccountDecision$inboundSchema,
    reasons: z.array(AccountRiskReason$inboundSchema),
  });

export function accountRiskFromJSON(
  jsonString: string,
): SafeParseResult<AccountRisk, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountRisk$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountRisk' from JSON`,
  );
}
