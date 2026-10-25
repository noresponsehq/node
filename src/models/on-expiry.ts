import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The decision a held assessment takes when hold_seconds pass before its investigation completes, unless the evidence so far gives a stricter one (default review). It is announced as account.risk_changed like any other change, so an expired hold is always announced. A hosted provider hook, which cannot wait, answers a held account by it at once: deny for block, allow otherwise. Kept while the flow is immediate.
 */
export const OnExpiry = {
  Allow: "allow",
  Review: "review",
  Block: "block",
} as const;
/**
 * The decision a held assessment takes when hold_seconds pass before its investigation completes, unless the evidence so far gives a stricter one (default review). It is announced as account.risk_changed like any other change, so an expired hold is always announced. A hosted provider hook, which cannot wait, answers a held account by it at once: deny for block, allow otherwise. Kept while the flow is immediate.
 */
export type OnExpiry = OpenEnum<typeof OnExpiry>;

/** @internal */
export const OnExpiry$inboundSchema: z.ZodMiniType<OnExpiry, unknown> =
  openEnums.inboundSchema(OnExpiry);
/** @internal */
export const OnExpiry$outboundSchema: z.ZodMiniType<string, OnExpiry> =
  openEnums.outboundSchema(OnExpiry);
