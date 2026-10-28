import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.
 */
export const Decision = {
  Allow: "allow",
  StepUp: "step_up",
  Review: "review",
  Block: "block",
} as const;
/**
 * An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.
 */
export type Decision = OpenEnum<typeof Decision>;

/** @internal */
export const Decision$inboundSchema: z.ZodMiniType<Decision, unknown> =
  openEnums.inboundSchema(Decision);
/** @internal */
export const Decision$outboundSchema: z.ZodMiniType<string, Decision> =
  openEnums.outboundSchema(Decision);
