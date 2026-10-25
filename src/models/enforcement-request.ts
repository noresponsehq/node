import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  EnforcementAction,
  EnforcementAction$outboundSchema,
} from "./enforcement-action.js";
import {
  EnforcementProvider,
  EnforcementProvider$outboundSchema,
} from "./enforcement-provider.js";
import {
  EnforcementState,
  EnforcementState$outboundSchema,
} from "./enforcement-state.js";
import {
  EnforcementStatus,
  EnforcementStatus$outboundSchema,
} from "./enforcement-status.js";
import { Flow, Flow$outboundSchema } from "./flow.js";

/**
 * POST /v1/accounts/{account_id}/enforcements body: what the workspace did to the account in its identity provider after reading the account's risk at risk_version. The account is named by the path and the workspace by the API key, so neither is a body member. An enforcement is the workspace's own action, not an outcome: what the workspace later learned about an assessment goes to POST /v1/assessments/{assessment_id}/outcomes. The record's key is (account, risk_version, flow, action), so a retry of the same report is safe and needs no Idempotency-Key.
 */
export type EnforcementRequest = {
  /**
   * The account's risk_version the workspace acted on, as read from GET /v1/accounts/{account_id}, GET /v1/accounts, an assessment answer or account.risk_changed. A version older than the account's current one is accepted and stored; a version newer than the current one answers 409 risk_version_ahead.
   */
  riskVersion: number;
  /**
   * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
   */
  flow: Flow;
  /**
   * What the workspace did in its identity provider: revoke_sessions (signed the account out everywhere), restrict (limited what the account can do), unrestrict (lifted an earlier restriction), fail_onboarding (stopped an account that was still onboarding), reject_activation (refused to activate a provisional account), activate (let a held onboarding or provisional account in) or none (decided to take no action).
   */
  action: EnforcementAction;
  /**
   * The account's state in the workspace's identity provider just before the action: onboarding, provisional (created, not yet activated), active, restricted or rejected.
   */
  stateBefore: EnforcementState;
  /**
   * applied when the identity provider accepted the action, failed when it refused it or could not be reached. Only applied counts as enforced.
   */
  status: EnforcementStatus;
  /**
   * The identity provider the action ran in; custom for the workspace's own user store.
   */
  provider: EnforcementProvider;
  /**
   * Why a failed action failed, as a short code of the workspace's choosing (lower-case letters, digits, '_', '.' and '-'), such as the identity provider's error code. Allowed only with status failed: with status applied it answers 400 invalid_request. Keep personal data out of it.
   */
  errorCode?: string | undefined;
};

/** @internal */
export type EnforcementRequest$Outbound = {
  risk_version: number;
  flow: string;
  action: string;
  state_before: string;
  status: string;
  provider: string;
  error_code?: string | undefined;
};

/** @internal */
export const EnforcementRequest$outboundSchema: z.ZodMiniType<
  EnforcementRequest$Outbound,
  EnforcementRequest
> = z.pipe(
  z.object({
    riskVersion: z.int(),
    flow: Flow$outboundSchema,
    action: EnforcementAction$outboundSchema,
    stateBefore: EnforcementState$outboundSchema,
    status: EnforcementStatus$outboundSchema,
    provider: EnforcementProvider$outboundSchema,
    errorCode: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      riskVersion: "risk_version",
      stateBefore: "state_before",
      errorCode: "error_code",
    });
  }),
);

export function enforcementRequestToJSON(
  enforcementRequest: EnforcementRequest,
): string {
  return JSON.stringify(
    EnforcementRequest$outboundSchema.parse(enforcementRequest),
  );
}
