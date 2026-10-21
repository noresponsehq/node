import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

/**
 * POST /v1/keys/rotate body. The tenant and the key being rotated are the API key that signs the request, so neither is a body member. An empty object takes the default overlap.
 */
export type KeyRotationRequest = {
  /**
   * How long the presented key keeps working beside the new one, from 60 seconds to 7 days. Default 86400 (24 hours). At the end of the overlap the presented key stops authenticating.
   */
  overlapSeconds?: number | undefined;
};

/** @internal */
export type KeyRotationRequest$Outbound = {
  overlap_seconds?: number | undefined;
};

/** @internal */
export const KeyRotationRequest$outboundSchema: z.ZodMiniType<
  KeyRotationRequest$Outbound,
  KeyRotationRequest
> = z.pipe(
  z.object({
    overlapSeconds: z.optional(z.int()),
  }),
  z.transform((v) => {
    return remap$(v, {
      overlapSeconds: "overlap_seconds",
    });
  }),
);

export function keyRotationRequestToJSON(
  keyRotationRequest: KeyRotationRequest,
): string {
  return JSON.stringify(
    KeyRotationRequest$outboundSchema.parse(keyRotationRequest),
  );
}
