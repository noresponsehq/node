import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

export type PolicyPreviewRequestFlowsPurchase = {
  stepUp?: number | undefined;
  review?: number | undefined;
  block?: number | null | undefined;
  /**
   * Send true; false is refused.
   */
  inheritsAccountCreation?: boolean | undefined;
};

/** @internal */
export type PolicyPreviewRequestFlowsPurchase$Outbound = {
  step_up?: number | undefined;
  review?: number | undefined;
  block?: number | null | undefined;
  inherits_account_creation?: boolean | undefined;
};

/** @internal */
export const PolicyPreviewRequestFlowsPurchase$outboundSchema: z.ZodMiniType<
  PolicyPreviewRequestFlowsPurchase$Outbound,
  PolicyPreviewRequestFlowsPurchase
> = z.pipe(
  z.object({
    stepUp: z.optional(z.int()),
    review: z.optional(z.int()),
    block: z.optional(z.nullable(z.int())),
    inheritsAccountCreation: z.optional(z.boolean()),
  }),
  z.transform((v) => {
    return remap$(v, {
      stepUp: "step_up",
      inheritsAccountCreation: "inherits_account_creation",
    });
  }),
);

export function policyPreviewRequestFlowsPurchaseToJSON(
  policyPreviewRequestFlowsPurchase: PolicyPreviewRequestFlowsPurchase,
): string {
  return JSON.stringify(
    PolicyPreviewRequestFlowsPurchase$outboundSchema.parse(
      policyPreviewRequestFlowsPurchase,
    ),
  );
}
