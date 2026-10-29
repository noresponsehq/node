import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Account, Account$inboundSchema } from "./account.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Flow, Flow$inboundSchema } from "./flow.js";
import { Status, Status$inboundSchema } from "./status.js";

/**
 * The decision prepared for one HTTP attempt. Its account field preserves the account decision returned for that attempt, even after subsequent changes.
 */
export type DecisionReceipt = {
  /**
   * Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.
   */
  assessmentId: string;
  /**
   * Monotonic revision of this assessment. 1 on the synchronous answer; each material change while the assessment is served (an async continuation settling a source, a change of recommendation, confidence or status) increments it. Expiry does not increment it: an expired assessment is gone, not revised, and the expiry webhook carries the last served version.
   */
  assessmentVersion: number;
  /**
   * Version of the hand-authored heuristic policy that produced the recommendation, for example 'risk-2026-10.7'. A workspace threshold override adds a +t<N> suffix, e.g. 'risk-2026-10.7+t3'.
   */
  policyVersion?: string | undefined;
  /**
   * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
   */
  flow: Flow;
  /**
   * Processing state, separate from evidence coverage. complete: final; nothing is still running, but unsupported, failed or unanswered lanes remain in incomplete_sources. partial: a recommendation exists and evidence is incomplete; assessment_url identifies continuing work when present. pending: no recommendation yet; poll or wait for the webhook. Finished processing does not mean all sources answered.
   */
  status: Status;
  score?: number | undefined;
  /**
   * Body of the 200 answer to GET /v1/accounts/{account_id}: the one current risk of one of the calling workspace's accounts. It is the risk of the account's latest assessment that has a decision (status complete or partial), by created_at and then assessment_id, scored exactly as GET /v1/assessments/{assessment_id} scores that assessment, plus the account's own reason shared_api_key when a key issued to the account was used from many IP addresses or countries (POST /v1/key_usage/batches). Its assessments are the account's history (GET /v1/accounts/{account_id}/assessments).
   */
  account?: Account | undefined;
};

/** @internal */
export const DecisionReceipt$inboundSchema: z.ZodMiniType<
  DecisionReceipt,
  unknown
> = z.pipe(
  z.object({
    assessment_id: types.string(),
    assessment_version: types.number(),
    policy_version: types.optional(types.string()),
    flow: Flow$inboundSchema,
    status: Status$inboundSchema,
    score: types.optional(types.number()),
    account: types.optional(Account$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "assessment_id": "assessmentId",
      "assessment_version": "assessmentVersion",
      "policy_version": "policyVersion",
    });
  }),
);

export function decisionReceiptFromJSON(
  jsonString: string,
): SafeParseResult<DecisionReceipt, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => DecisionReceipt$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'DecisionReceipt' from JSON`,
  );
}
