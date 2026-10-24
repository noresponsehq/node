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
  AccountRisk,
  AccountRisk$inboundSchema,
  AccountRisk$Outbound,
  AccountRisk$outboundSchema,
} from "./account-risk.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Body of the 200 answer to GET /v1/accounts/{account_id}: the one current risk of one of the calling workspace's accounts. It is the risk of the account's latest assessment that has a decision (status complete or partial), by created_at and then assessment_id, scored exactly as GET /v1/assessments/{assessment_id} scores that assessment, plus the account's own reason shared_api_key when a key issued to the account was used from many IP addresses or countries (POST /v1/key_usage/batches). Its assessments are the account's history (GET /v1/accounts/{account_id}/assessments).
 */
export type Account = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  /**
   * The account_id the workspace sends with its assessments.
   */
  id: string;
  risk: AccountRisk;
  /**
   * The decision for each flow: the account's score under that flow's thresholds. A flow the workspace has not set uses its account_creation thresholds, so the flows differ only where it set them. The flow of the current assessment is held while that flow's admission is held and the assessment's investigation has not completed.
   */
  decisionsByFlow: AccountDecisionsByFlow;
  /**
   * The assessment the current risk comes from.
   */
  assessmentId: string;
  /**
   * updated_at of that assessment's latest revision.
   */
  updatedAt: string;
  /**
   * The version of the account's current risk. It increases every time the account's current risk or decisions_by_flow changes, and does not decrease. Of two copies of an account, the one with the higher risk_version is newer. account.risk_changed carries the risk_version that its change made.
   */
  riskVersion: number;
};

/** @internal */
export const Account$inboundSchema: z.ZodMiniType<Account, unknown> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    id: types.string(),
    risk: AccountRisk$inboundSchema,
    decisions_by_flow: AccountDecisionsByFlow$inboundSchema,
    assessment_id: types.string(),
    updated_at: types.string(),
    risk_version: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "decisions_by_flow": "decisionsByFlow",
      "assessment_id": "assessmentId",
      "updated_at": "updatedAt",
      "risk_version": "riskVersion",
    });
  }),
);
/** @internal */
export type Account$Outbound = {
  schema_version: "1";
  id: string;
  risk: AccountRisk$Outbound;
  decisions_by_flow: AccountDecisionsByFlow$Outbound;
  assessment_id: string;
  updated_at: string;
  risk_version: number;
};

/** @internal */
export const Account$outboundSchema: z.ZodMiniType<Account$Outbound, Account> =
  z.pipe(
    z.object({
      schemaVersion: z.literal("1"),
      id: z.string(),
      risk: AccountRisk$outboundSchema,
      decisionsByFlow: AccountDecisionsByFlow$outboundSchema,
      assessmentId: z.string(),
      updatedAt: z.string(),
      riskVersion: z.int(),
    }),
    z.transform((v) => {
      return remap$(v, {
        schemaVersion: "schema_version",
        decisionsByFlow: "decisions_by_flow",
        assessmentId: "assessment_id",
        updatedAt: "updated_at",
        riskVersion: "risk_version",
      });
    }),
  );

export function accountToJSON(account: Account): string {
  return JSON.stringify(Account$outboundSchema.parse(account));
}
export function accountFromJSON(
  jsonString: string,
): SafeParseResult<Account, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Account$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Account' from JSON`,
  );
}
