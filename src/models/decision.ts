import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * The decision of the assessment's latest stored revision: block when its stored risk.block is true, otherwise its recommendation. This is not the account's current decision or held-admission state. Combined with recommendation using AND.
 */
export const Decision = {
  Allow: "allow",
  StepUp: "step_up",
  Review: "review",
  Block: "block",
} as const;
/**
 * The decision of the assessment's latest stored revision: block when its stored risk.block is true, otherwise its recommendation. This is not the account's current decision or held-admission state. Combined with recommendation using AND.
 */
export type Decision = ClosedEnum<typeof Decision>;

/** @internal */
export const Decision$outboundSchema: z.ZodMiniEnum<typeof Decision> = z.enum(
  Decision,
);
