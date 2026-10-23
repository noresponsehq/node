import * as z from "zod/v4-mini";

/**
 * Optional policy inputs: region.
 */
export type AssessmentRequestPolicyContext = {
  /**
   * ISO 3166-1 alpha-2 region of the signup, as the provider determines it.
   */
  region?: string | undefined;
};

/** @internal */
export type AssessmentRequestPolicyContext$Outbound = {
  region?: string | undefined;
};

/** @internal */
export const AssessmentRequestPolicyContext$outboundSchema: z.ZodMiniType<
  AssessmentRequestPolicyContext$Outbound,
  AssessmentRequestPolicyContext
> = z.object({
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
