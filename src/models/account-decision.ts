import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. held only for a flow whose admission is held (settings flows.<flow>.admission), when the account's current assessment was made for that flow and its investigation has not completed (status partial): the final decision arrives as account.risk_changed when the investigation completes, decided by its score, or when the hold's deadline (hold_seconds after the assessment was created) passes first, as the flow's on_expiry action or the decision the evidence so far gives, whichever is stricter. Your application applies it.
 */
export const AccountDecision = {
  Allow: "allow",
  StepUp: "step_up",
  Review: "review",
  Block: "block",
  Held: "held",
} as const;
/**
 * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. held only for a flow whose admission is held (settings flows.<flow>.admission), when the account's current assessment was made for that flow and its investigation has not completed (status partial): the final decision arrives as account.risk_changed when the investigation completes, decided by its score, or when the hold's deadline (hold_seconds after the assessment was created) passes first, as the flow's on_expiry action or the decision the evidence so far gives, whichever is stricter. Your application applies it.
 */
export type AccountDecision = OpenEnum<typeof AccountDecision>;

/** @internal */
export const AccountDecision$inboundSchema: z.ZodMiniType<
  AccountDecision,
  unknown
> = openEnums.inboundSchema(AccountDecision);
/** @internal */
export const AccountDecision$outboundSchema: z.ZodMiniType<
  string,
  AccountDecision
> = openEnums.outboundSchema(AccountDecision);
