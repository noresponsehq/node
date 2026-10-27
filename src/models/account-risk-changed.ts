import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountDecisionsByFlow,
  AccountDecisionsByFlow$inboundSchema,
  AccountDecisionsByFlow$Outbound,
  AccountDecisionsByFlow$outboundSchema,
} from "./account-decisions-by-flow.js";
import {
  Account,
  Account$inboundSchema,
  Account$Outbound,
  Account$outboundSchema,
} from "./account.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The account's decision for at least one flow changed. account is the account as GET /v1/accounts/{account_id} answers it for the revision that made the change: its new score, decision, reasons and decisions_by_flow, and the assessment the risk comes from. previous_decisions_by_flow are the decisions it replaced, so account.decisions_by_flow differs from them for at least one flow, and previous_risk_version is the risk_version they were announced at. On the account's first event no decision was announced before: previous_risk_version is absent and previous_decisions_by_flow is allow for every flow, the decisions an account has before its first event. Events of one account are not ordered: account.risk_version orders them, so keep the account with the highest risk_version and ignore an event whose account is older than the one held.
 */
export type AccountRiskChanged = {
  /**
   * Body of the 200 answer to GET /v1/accounts/{account_id}: the one current risk of one of the calling workspace's accounts. It is the risk of the account's latest assessment that has a decision (status complete or partial), by created_at and then assessment_id, scored exactly as GET /v1/assessments/{assessment_id} scores that assessment, plus the account's own reason shared_api_key when a key issued to the account was used from many IP addresses or countries (POST /v1/key_usage/batches). Its assessments are the account's history (GET /v1/accounts/{account_id}/assessments).
   */
  account: Account;
  /**
   * The decision for each flow: the account's score under that flow's thresholds. A flow the workspace has not set uses its account_creation thresholds, so the flows differ only where it set them. The flow of the current assessment is held while that flow's admission is held and the assessment's investigation has not completed.
   */
  previousDecisionsByFlow: AccountDecisionsByFlow;
  /**
   * The account's risk_version when previous_decisions_by_flow were announced, always lower than account.risk_version. Absent on the account's first event, when no decision was announced before, and on the first event after the account was deleted.
   */
  previousRiskVersion?: number | undefined;
};

/** @internal */
export const AccountRiskChanged$inboundSchema: z.ZodMiniType<
  AccountRiskChanged,
  unknown
> = z.pipe(
  z.object({
    account: Account$inboundSchema,
    previous_decisions_by_flow: AccountDecisionsByFlow$inboundSchema,
    previous_risk_version: types.optional(types.number()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "previous_decisions_by_flow": "previousDecisionsByFlow",
      "previous_risk_version": "previousRiskVersion",
    });
  }),
);
/** @internal */
export type AccountRiskChanged$Outbound = {
  account: Account$Outbound;
  previous_decisions_by_flow: AccountDecisionsByFlow$Outbound;
  previous_risk_version?: number | undefined;
};

/** @internal */
export const AccountRiskChanged$outboundSchema: z.ZodMiniType<
  AccountRiskChanged$Outbound,
  AccountRiskChanged
> = z.pipe(
  z.object({
    account: Account$outboundSchema,
    previousDecisionsByFlow: AccountDecisionsByFlow$outboundSchema,
    previousRiskVersion: z.optional(z.int()),
  }),
  z.transform((v) => {
    return remap$(v, {
      previousDecisionsByFlow: "previous_decisions_by_flow",
      previousRiskVersion: "previous_risk_version",
    });
  }),
);

export function accountRiskChangedToJSON(
  accountRiskChanged: AccountRiskChanged,
): string {
  return JSON.stringify(
    AccountRiskChanged$outboundSchema.parse(accountRiskChanged),
  );
}
export function accountRiskChangedFromJSON(
  jsonString: string,
): SafeParseResult<AccountRiskChanged, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountRiskChanged$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountRiskChanged' from JSON`,
  );
}
