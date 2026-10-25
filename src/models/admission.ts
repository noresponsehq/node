import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * immediate (the default): an assessment of this flow is decided from the evidence its answer has, and later evidence may change the decision. held: while the account's current assessment of this flow has not completed, the account's decision for the flow is held, and the final decision arrives as account.risk_changed when the investigation completes or hold_seconds pass, whichever is first. Each flow has its own admission.
 */
export const Admission = {
  Immediate: "immediate",
  Held: "held",
} as const;
/**
 * immediate (the default): an assessment of this flow is decided from the evidence its answer has, and later evidence may change the decision. held: while the account's current assessment of this flow has not completed, the account's decision for the flow is held, and the final decision arrives as account.risk_changed when the investigation completes or hold_seconds pass, whichever is first. Each flow has its own admission.
 */
export type Admission = OpenEnum<typeof Admission>;

/** @internal */
export const Admission$inboundSchema: z.ZodMiniType<Admission, unknown> =
  openEnums.inboundSchema(Admission);
/** @internal */
export const Admission$outboundSchema: z.ZodMiniType<string, Admission> =
  openEnums.outboundSchema(Admission);
