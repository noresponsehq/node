import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountDecisionsByFlow,
  AccountDecisionsByFlow$inboundSchema,
} from "./account-decisions-by-flow.js";
import { AccountRisk, AccountRisk$inboundSchema } from "./account-risk.js";
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
   * The decision for each flow: the account's score under that flow's thresholds. A flow the workspace has not set uses its account_creation thresholds, so the flows differ only where it set them.
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
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "decisions_by_flow": "decisionsByFlow",
      "assessment_id": "assessmentId",
      "updated_at": "updatedAt",
    });
  }),
);

export function accountFromJSON(
  jsonString: string,
): SafeParseResult<Account, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Account$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Account' from JSON`,
  );
}
