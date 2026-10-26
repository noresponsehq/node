import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountDecision,
  AccountDecision$inboundSchema,
  AccountDecision$outboundSchema,
} from "./account-decision.js";
import {
  AccountRiskReason,
  AccountRiskReason$inboundSchema,
  AccountRiskReason$Outbound,
  AccountRiskReason$outboundSchema,
} from "./account-risk-reason.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AccountRisk = {
  /**
   * 0 (safe) to 100 (risky), as risk.score of the assessment.
   */
  score: number;
  /**
   * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. held only for a flow whose admission is held (settings flows.<flow>.admission), when the account's current assessment was made for that flow and its investigation has not completed (status partial): the final decision arrives as account.risk_changed when the investigation completes, decided by its score, or when the hold's deadline (hold_seconds after the assessment was created) passes first, as the flow's on_expiry action or the decision the evidence so far gives, whichever is stricter. Your application applies it.
   */
  decision: AccountDecision;
  /**
   * Every reason that fired: risk-raising reasons first, then neutral, then risk-lowering, each strongest impact band first and then by code. The policy's numeric weights are kept private, so a reason carries only its direction and impact band.
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
/** @internal */
export type AccountRisk$Outbound = {
  score: number;
  decision: string;
  reasons: Array<AccountRiskReason$Outbound>;
};

/** @internal */
export const AccountRisk$outboundSchema: z.ZodMiniType<
  AccountRisk$Outbound,
  AccountRisk
> = z.object({
  score: z.int(),
  decision: AccountDecision$outboundSchema,
  reasons: z.array(AccountRiskReason$outboundSchema),
});

export function accountRiskToJSON(accountRisk: AccountRisk): string {
  return JSON.stringify(AccountRisk$outboundSchema.parse(accountRisk));
}
export function accountRiskFromJSON(
  jsonString: string,
): SafeParseResult<AccountRisk, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountRisk$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountRisk' from JSON`,
  );
}
