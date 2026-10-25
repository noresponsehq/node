import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  EnforcementAction,
  EnforcementAction$inboundSchema,
} from "./enforcement-action.js";
import {
  EnforcementProvider,
  EnforcementProvider$inboundSchema,
} from "./enforcement-provider.js";
import {
  EnforcementState,
  EnforcementState$inboundSchema,
} from "./enforcement-state.js";
import {
  EnforcementStatus,
  EnforcementStatus$inboundSchema,
} from "./enforcement-status.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Flow, Flow$inboundSchema } from "./flow.js";

/**
 * The answer of POST /v1/accounts/{account_id}/enforcements: one enforcement of one of the calling workspace's accounts, kept once per (account, risk_version, flow, action). The first report answers 201 with the new record. A repeat answers 200 with the record as first stored, whatever the repeat's state_before, status, provider or error_code. The one exception is a stored failed record followed by an applied report: the record becomes applied, keeps its id and created_at, takes the applied report's state_before and provider, drops error_code and answers 201, so a successful retry after a failure is recorded. Only an applied record at the account's current risk_version takes the account out of GET /v1/accounts?unenforced=true.
 */
export type Enforcement = {
  /**
   * Opaque, server-assigned id of one recorded enforcement: 'enf_' and 26 Crockford base32 characters. Unique within the workspace.
   */
  id: string;
  /**
   * The account_id of the request path.
   */
  accountId: string;
  /**
   * The account's risk_version the workspace acted on. It can be older than the account's current risk_version: such a record is kept and does not count for unenforced.
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
  /**
   * When NoResponse first recorded this enforcement, in UTC. A failed record that becomes applied keeps it.
   */
  createdAt: string;
};

/** @internal */
export const Enforcement$inboundSchema: z.ZodMiniType<Enforcement, unknown> = z
  .pipe(
    z.object({
      id: types.string(),
      account_id: types.string(),
      risk_version: types.number(),
      flow: Flow$inboundSchema,
      action: EnforcementAction$inboundSchema,
      state_before: EnforcementState$inboundSchema,
      status: EnforcementStatus$inboundSchema,
      provider: EnforcementProvider$inboundSchema,
      error_code: types.optional(types.string()),
      created_at: types.string(),
    }),
    z.transform((v) => {
      return remap$(v, {
        "account_id": "accountId",
        "risk_version": "riskVersion",
        "state_before": "stateBefore",
        "error_code": "errorCode",
        "created_at": "createdAt",
      });
    }),
  );

export function enforcementFromJSON(
  jsonString: string,
): SafeParseResult<Enforcement, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Enforcement$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Enforcement' from JSON`,
  );
}
