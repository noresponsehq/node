import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The account's state in the workspace's identity provider just before the action: onboarding, provisional (created, not yet activated), active, restricted or rejected.
 */
export const EnforcementState = {
  Onboarding: "onboarding",
  Provisional: "provisional",
  Active: "active",
  Restricted: "restricted",
  Rejected: "rejected",
} as const;
/**
 * The account's state in the workspace's identity provider just before the action: onboarding, provisional (created, not yet activated), active, restricted or rejected.
 */
export type EnforcementState = OpenEnum<typeof EnforcementState>;

/** @internal */
export const EnforcementState$inboundSchema: z.ZodMiniType<
  EnforcementState,
  unknown
> = openEnums.inboundSchema(EnforcementState);
/** @internal */
export const EnforcementState$outboundSchema: z.ZodMiniType<
  string,
  EnforcementState
> = openEnums.outboundSchema(EnforcementState);
