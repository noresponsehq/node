import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Admission, Admission$outboundSchema } from "./admission.js";
import { OnExpiry, OnExpiry$outboundSchema } from "./on-expiry.js";
import {
  UsageCountDepth,
  UsageCountDepth$outboundSchema,
} from "./usage-count-depth.js";

/**
 * A change to one flow. A field left out keeps the value in force. Thresholds set on login or purchase start from the values in force, account_creation's while it inherits them. After the change, 0 < step_up < review <= 100 and block is off or review <= block <= 100.
 */
export type FlowChange = {
  stepUp?: number | undefined;
  review?: number | undefined;
  /**
   * The score from which the decision is block; null turns blocking off.
   */
  block?: number | null | undefined;
  /**
   * assessments only.
   */
  defaultDepth?: UsageCountDepth | undefined;
  /**
   * Login or purchase only: drop the flow's own thresholds so it uses account_creation's again. Not combined with step_up, review or block. Send true; false is refused.
   */
  inheritsAccountCreation?: boolean | undefined;
  /**
   * Alias of inherits_account_creation, still accepted. Send true; false is refused.
   *
   * @deprecated field: This will be removed in a future release, please migrate away from it as soon as possible.
   */
  inheritsSignup?: boolean | undefined;
  /**
   * immediate (the default): an assessment of this flow is decided from the evidence its answer has, and later evidence may change the decision. held: while the account's current assessment of this flow has not completed, the account's decision for the flow is held, and the final decision arrives as account.risk_changed when the investigation completes or hold_seconds pass, whichever is first. Each flow has its own admission.
   */
  admission?: Admission | undefined;
  /**
   * How long a held flow's assessment is held after it was created, 30 to 86400 seconds (default 300). Kept while the flow is immediate.
   */
  holdSeconds?: number | undefined;
  /**
   * The decision a held assessment takes when hold_seconds pass before its investigation completes, unless the evidence so far gives a stricter one (default review). It is announced as account.risk_changed like any other change, so an expired hold is always announced. A hosted provider hook, which cannot wait, answers a held account by it at once: deny for block, allow otherwise. Kept while the flow is immediate.
   */
  onExpiry?: OnExpiry | undefined;
};

/** @internal */
export type FlowChange$Outbound = {
  step_up?: number | undefined;
  review?: number | undefined;
  block?: number | null | undefined;
  default_depth?: string | undefined;
  inherits_account_creation?: boolean | undefined;
  inherits_signup?: boolean | undefined;
  admission?: string | undefined;
  hold_seconds?: number | undefined;
  on_expiry?: string | undefined;
};

/** @internal */
export const FlowChange$outboundSchema: z.ZodMiniType<
  FlowChange$Outbound,
  FlowChange
> = z.pipe(
  z.object({
    stepUp: z.optional(z.int()),
    review: z.optional(z.int()),
    block: z.optional(z.nullable(z.int())),
    defaultDepth: z.optional(UsageCountDepth$outboundSchema),
    inheritsAccountCreation: z.optional(z.boolean()),
    inheritsSignup: z.optional(z.boolean()),
    admission: z.optional(Admission$outboundSchema),
    holdSeconds: z.optional(z.int()),
    onExpiry: z.optional(OnExpiry$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      stepUp: "step_up",
      defaultDepth: "default_depth",
      inheritsAccountCreation: "inherits_account_creation",
      inheritsSignup: "inherits_signup",
      holdSeconds: "hold_seconds",
      onExpiry: "on_expiry",
    });
  }),
);

export function flowChangeToJSON(flowChange: FlowChange): string {
  return JSON.stringify(FlowChange$outboundSchema.parse(flowChange));
}
