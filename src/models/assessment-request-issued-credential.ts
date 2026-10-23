import * as z from "zod/v4-mini";

/**
 * Optional. When your platform issues an API key to the new account, send SHA-256 of that key, so later usage of the key, or a leaked copy, ties back to this assessment. Each SDK has a helper that computes it. Send only the hash: customer keys are high-entropy, so the hash reveals nothing about them. The assessment stores it, and no response, webhook or log carries it.
 */
export type AssessmentRequestIssuedCredential = {
  /**
   * SHA-256 of the issued key's UTF-8 bytes, as 64 lower-case hex characters.
   */
  sha256: string;
};

/** @internal */
export type AssessmentRequestIssuedCredential$Outbound = {
  sha256: string;
};

/** @internal */
export const AssessmentRequestIssuedCredential$outboundSchema: z.ZodMiniType<
  AssessmentRequestIssuedCredential$Outbound,
  AssessmentRequestIssuedCredential
> = z.object({
  sha256: z.string(),
});

export function assessmentRequestIssuedCredentialToJSON(
  assessmentRequestIssuedCredential: AssessmentRequestIssuedCredential,
): string {
  return JSON.stringify(
    AssessmentRequestIssuedCredential$outboundSchema.parse(
      assessmentRequestIssuedCredential,
    ),
  );
}
