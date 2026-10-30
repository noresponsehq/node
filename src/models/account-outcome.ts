import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountOutcomeActor,
  AccountOutcomeActor$inboundSchema,
} from "./account-outcome-actor.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Outcome, Outcome$inboundSchema } from "./outcome.js";

/**
 * Immutable acceptance receipt. risk_version is the account version after this report committed, not the version when a retry reads it. effective_outcome_id names the effective head at that write. The effective expiration may shorten under retention changes. A legitimate report or correction removes only the account-feedback contribution, not unrelated risk.
 */
export type AccountOutcome = {
  /**
   * Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.
   */
  id: string;
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  /**
   * What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this workspace for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.
   */
  outcome: Outcome;
  /**
   * Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.
   */
  supersedes?: string | undefined;
  observedAt: string;
  receivedAt: string;
  expiresAt: string;
  /**
   * Your own opaque reference for the outcome, such as a case or ticket id. Stored as given and not interpreted; keep direct identifiers out of it.
   */
  externalRef?: string | undefined;
  actor: AccountOutcomeActor;
  riskVersionBefore: number;
  riskVersion: number;
  /**
   * Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.
   */
  effectiveOutcomeId?: string | undefined;
};

/** @internal */
export const AccountOutcome$inboundSchema: z.ZodMiniType<
  AccountOutcome,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    account_id: types.string(),
    outcome: Outcome$inboundSchema,
    supersedes: types.optional(types.string()),
    observed_at: types.string(),
    received_at: types.string(),
    expires_at: types.string(),
    external_ref: types.optional(types.string()),
    actor: AccountOutcomeActor$inboundSchema,
    risk_version_before: types.number(),
    risk_version: types.number(),
    effective_outcome_id: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "account_id": "accountId",
      "observed_at": "observedAt",
      "received_at": "receivedAt",
      "expires_at": "expiresAt",
      "external_ref": "externalRef",
      "risk_version_before": "riskVersionBefore",
      "risk_version": "riskVersion",
      "effective_outcome_id": "effectiveOutcomeId",
    });
  }),
);

export function accountOutcomeFromJSON(
  jsonString: string,
): SafeParseResult<AccountOutcome, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountOutcome$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountOutcome' from JSON`,
  );
}
