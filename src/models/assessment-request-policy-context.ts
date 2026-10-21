import * as z from "zod/v4-mini";
import { Flow, Flow$outboundSchema } from "./flow.js";

export type AssessmentRequestPolicyContext = {
  /**
   * The provider flow the assessment gates. Absent means signup.
   */
  flow?: Flow | undefined;
  /**
   * ISO 3166-1 alpha-2 region of the signup, as the provider determines it.
   */
  region?: string | undefined;
};

/** @internal */
export type AssessmentRequestPolicyContext$Outbound = {
  flow?: string | undefined;
  region?: string | undefined;
};

/** @internal */
export const AssessmentRequestPolicyContext$outboundSchema: z.ZodMiniType<
  AssessmentRequestPolicyContext$Outbound,
  AssessmentRequestPolicyContext
> = z.object({
  flow: z.optional(Flow$outboundSchema),
  region: z.optional(z.string()),
});

export function assessmentRequestPolicyContextToJSON(
  assessmentRequestPolicyContext: AssessmentRequestPolicyContext,
): string {
  return JSON.stringify(
    AssessmentRequestPolicyContext$outboundSchema.parse(
      assessmentRequestPolicyContext,
    ),
  );
}
