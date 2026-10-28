import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Account, Account$inboundSchema } from "./account.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Retrieve the account decision at one recorded risk version. The answer uses the original assessment and account-specific risk inputs. Earlier versions that were not captured return 404. The assessment version, policy version and account calculation version identify the decision.
 */
export type AccountDecisionSnapshot = {
  /**
   * Body of the 200 answer to GET /v1/accounts/{account_id}: the one current risk of one of the calling workspace's accounts. It is the risk of the account's latest assessment that has a decision (status complete or partial), by created_at and then assessment_id, scored exactly as GET /v1/assessments/{assessment_id} scores that assessment, plus the account's own reason shared_api_key when a key issued to the account was used from many IP addresses or countries (POST /v1/key_usage/batches). Its assessments are the account's history (GET /v1/accounts/{account_id}/assessments).
   */
  account: Account;
  /**
   * Monotonic revision of this assessment. 1 on the synchronous answer; each material change while the assessment is served (an async continuation settling a source, a change of recommendation, confidence or status) increments it. Expiry does not increment it: an expired assessment is gone, not revised, and the expiry webhook carries the last served version.
   */
  assessmentVersion: number;
  /**
   * Version of the hand-authored heuristic policy that produced the recommendation, for example 'risk-2026-10.7'. A workspace threshold override adds a +t<N> suffix, e.g. 'risk-2026-10.7+t3'.
   */
  policyVersion: string;
  overlayVersion: 1;
  changedAt: string;
  /**
   * Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.
   */
  feedbackOutcomeId?: string | undefined;
};

/** @internal */
export const AccountDecisionSnapshot$inboundSchema: z.ZodMiniType<
  AccountDecisionSnapshot,
  unknown
> = z.pipe(
  z.object({
    account: Account$inboundSchema,
    assessment_version: types.number(),
    policy_version: types.string(),
    overlay_version: types.literal(1),
    changed_at: types.string(),
    feedback_outcome_id: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "assessment_version": "assessmentVersion",
      "policy_version": "policyVersion",
      "overlay_version": "overlayVersion",
      "changed_at": "changedAt",
      "feedback_outcome_id": "feedbackOutcomeId",
    });
  }),
);

export function accountDecisionSnapshotFromJSON(
  jsonString: string,
): SafeParseResult<AccountDecisionSnapshot, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountDecisionSnapshot$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountDecisionSnapshot' from JSON`,
  );
}
