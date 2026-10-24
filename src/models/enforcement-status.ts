import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * applied when the identity provider accepted the action, failed when it refused it or could not be reached. Only applied counts as enforced.
 */
export const EnforcementStatus = {
  Applied: "applied",
  Failed: "failed",
} as const;
/**
 * applied when the identity provider accepted the action, failed when it refused it or could not be reached. Only applied counts as enforced.
 */
export type EnforcementStatus = OpenEnum<typeof EnforcementStatus>;

/** @internal */
export const EnforcementStatus$inboundSchema: z.ZodMiniType<
  EnforcementStatus,
  unknown
> = openEnums.inboundSchema(EnforcementStatus);
/** @internal */
export const EnforcementStatus$outboundSchema: z.ZodMiniType<
  string,
  EnforcementStatus
> = openEnums.outboundSchema(EnforcementStatus);
