import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import {
  AccountDecision,
  AccountDecision$inboundSchema,
  AccountDecision$outboundSchema,
} from "./account-decision.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The decision for each flow: the account's score under that flow's thresholds. A flow the workspace has not set uses its account_creation thresholds, so the flows differ only where it set them. The flow of the current assessment is held while that flow's admission is held and the assessment's investigation has not completed.
 */
export type AccountDecisionsByFlow = {
  /**
   * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. held only for a flow whose admission is held (settings flows.<flow>.admission), when the account's current assessment was made for that flow and its investigation has not completed (status partial): the final decision arrives as account.risk_changed when the investigation completes, decided by its score, or when the hold's deadline (hold_seconds after the assessment was created) passes first, as the flow's on_expiry action or the decision the evidence so far gives, whichever is stricter. Your application applies it.
   */
  accountCreation: AccountDecision;
  /**
   * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. held only for a flow whose admission is held (settings flows.<flow>.admission), when the account's current assessment was made for that flow and its investigation has not completed (status partial): the final decision arrives as account.risk_changed when the investigation completes, decided by its score, or when the hold's deadline (hold_seconds after the assessment was created) passes first, as the flow's on_expiry action or the decision the evidence so far gives, whichever is stricter. Your application applies it.
   */
  login: AccountDecision;
  /**
   * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. held only for a flow whose admission is held (settings flows.<flow>.admission), when the account's current assessment was made for that flow and its investigation has not completed (status partial): the final decision arrives as account.risk_changed when the investigation completes, decided by its score, or when the hold's deadline (hold_seconds after the assessment was created) passes first, as the flow's on_expiry action or the decision the evidence so far gives, whichever is stricter. Your application applies it.
   */
  purchase: AccountDecision;
};

/** @internal */
export const AccountDecisionsByFlow$inboundSchema: z.ZodMiniType<
  AccountDecisionsByFlow,
  unknown
> = z.pipe(
  z.object({
    account_creation: AccountDecision$inboundSchema,
    login: AccountDecision$inboundSchema,
    purchase: AccountDecision$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "account_creation": "accountCreation",
    });
  }),
);
/** @internal */
export type AccountDecisionsByFlow$Outbound = {
  account_creation: string;
  login: string;
  purchase: string;
};

/** @internal */
export const AccountDecisionsByFlow$outboundSchema: z.ZodMiniType<
  AccountDecisionsByFlow$Outbound,
  AccountDecisionsByFlow
> = z.pipe(
  z.object({
    accountCreation: AccountDecision$outboundSchema,
    login: AccountDecision$outboundSchema,
    purchase: AccountDecision$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      accountCreation: "account_creation",
    });
  }),
);

export function accountDecisionsByFlowToJSON(
  accountDecisionsByFlow: AccountDecisionsByFlow,
): string {
  return JSON.stringify(
    AccountDecisionsByFlow$outboundSchema.parse(accountDecisionsByFlow),
  );
}
export function accountDecisionsByFlowFromJSON(
  jsonString: string,
): SafeParseResult<AccountDecisionsByFlow, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountDecisionsByFlow$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountDecisionsByFlow' from JSON`,
  );
}
