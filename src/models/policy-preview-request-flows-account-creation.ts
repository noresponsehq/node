import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

export type PolicyPreviewRequestFlowsAccountCreation = {
  stepUp?: number | undefined;
  review?: number | undefined;
  block?: number | null | undefined;
};

/** @internal */
export type PolicyPreviewRequestFlowsAccountCreation$Outbound = {
  step_up?: number | undefined;
  review?: number | undefined;
  block?: number | null | undefined;
};

/** @internal */
export const PolicyPreviewRequestFlowsAccountCreation$outboundSchema:
  z.ZodMiniType<
    PolicyPreviewRequestFlowsAccountCreation$Outbound,
    PolicyPreviewRequestFlowsAccountCreation
  > = z.pipe(
    z.object({
      stepUp: z.optional(z.int()),
      review: z.optional(z.int()),
      block: z.optional(z.nullable(z.int())),
    }),
    z.transform((v) => {
      return remap$(v, {
        stepUp: "step_up",
      });
    }),
  );

export function policyPreviewRequestFlowsAccountCreationToJSON(
  policyPreviewRequestFlowsAccountCreation:
    PolicyPreviewRequestFlowsAccountCreation,
): string {
  return JSON.stringify(
    PolicyPreviewRequestFlowsAccountCreation$outboundSchema.parse(
      policyPreviewRequestFlowsAccountCreation,
    ),
  );
}
