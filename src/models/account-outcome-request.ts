import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Outcome, Outcome$outboundSchema } from "./outcome.js";

/**
 * Record a factual report, not an enforcement action. A known outcome replaces the effective report. unknown alone records uncertainty without changing it; unknown with supersedes explicitly retracts it. supersedes must name the current effective report or the request answers 409 outcome_conflict. Reports remain append-only. Idempotency-Key is required. observed_at defaults to receipt time and cannot be over five minutes ahead.
 */
export type AccountOutcomeRequest = {
  /**
   * What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this workspace for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.
   */
  outcome: Outcome;
  observedAt?: string | undefined;
  /**
   * Your own opaque reference for the outcome, such as a case or ticket id. Stored as given and not interpreted; keep direct identifiers out of it.
   */
  externalRef?: string | undefined;
  /**
   * Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.
   */
  supersedes?: string | undefined;
};

/** @internal */
export type AccountOutcomeRequest$Outbound = {
  outcome: string;
  observed_at?: string | undefined;
  external_ref?: string | undefined;
  supersedes?: string | undefined;
};

/** @internal */
export const AccountOutcomeRequest$outboundSchema: z.ZodMiniType<
  AccountOutcomeRequest$Outbound,
  AccountOutcomeRequest
> = z.pipe(
  z.object({
    outcome: Outcome$outboundSchema,
    observedAt: z.optional(z.string()),
    externalRef: z.optional(z.string()),
    supersedes: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      observedAt: "observed_at",
      externalRef: "external_ref",
    });
  }),
);

export function accountOutcomeRequestToJSON(
  accountOutcomeRequest: AccountOutcomeRequest,
): string {
  return JSON.stringify(
    AccountOutcomeRequest$outboundSchema.parse(accountOutcomeRequest),
  );
}
