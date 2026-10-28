import * as z from "zod/v4-mini";

/**
 * Associate the SHA-256 of a high-entropy key issued by your service. Send the hash instead of the key. Repeating a hash returns its original association, including its retirement state. A hash associated with another account returns a conflict.
 */
export type CredentialRequest = {
  sha256: string;
};

/** @internal */
export type CredentialRequest$Outbound = {
  sha256: string;
};

/** @internal */
export const CredentialRequest$outboundSchema: z.ZodMiniType<
  CredentialRequest$Outbound,
  CredentialRequest
> = z.object({
  sha256: z.string(),
});

export function credentialRequestToJSON(
  credentialRequest: CredentialRequest,
): string {
  return JSON.stringify(
    CredentialRequest$outboundSchema.parse(credentialRequest),
  );
}
