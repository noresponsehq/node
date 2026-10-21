import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * Provider or OIDC assurance level, when the customer has mapped one.
 */
export const AssuranceLevel = {
  Unknown: "unknown",
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
/**
 * Provider or OIDC assurance level, when the customer has mapped one.
 */
export type AssuranceLevel = ClosedEnum<typeof AssuranceLevel>;

/** @internal */
export const AssuranceLevel$outboundSchema: z.ZodMiniEnum<
  typeof AssuranceLevel
> = z.enum(AssuranceLevel);
