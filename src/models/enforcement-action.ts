import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * What the workspace did in its identity provider: revoke_sessions (signed the account out everywhere), restrict (limited what the account can do), unrestrict (lifted an earlier restriction), fail_onboarding (stopped an account that was still onboarding), reject_activation (refused to activate a provisional account), activate (let a held onboarding or provisional account in) or none (decided to take no action).
 */
export const EnforcementAction = {
  RevokeSessions: "revoke_sessions",
  Restrict: "restrict",
  Unrestrict: "unrestrict",
  FailOnboarding: "fail_onboarding",
  RejectActivation: "reject_activation",
  Activate: "activate",
  None: "none",
} as const;
/**
 * What the workspace did in its identity provider: revoke_sessions (signed the account out everywhere), restrict (limited what the account can do), unrestrict (lifted an earlier restriction), fail_onboarding (stopped an account that was still onboarding), reject_activation (refused to activate a provisional account), activate (let a held onboarding or provisional account in) or none (decided to take no action).
 */
export type EnforcementAction = OpenEnum<typeof EnforcementAction>;

/** @internal */
export const EnforcementAction$inboundSchema: z.ZodMiniType<
  EnforcementAction,
  unknown
> = openEnums.inboundSchema(EnforcementAction);
/** @internal */
export const EnforcementAction$outboundSchema: z.ZodMiniType<
  string,
  EnforcementAction
> = openEnums.outboundSchema(EnforcementAction);
