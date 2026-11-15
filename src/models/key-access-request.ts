import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { ClosedEnum } from "../types/enums.js";

export const KeyAccessRequestDeniedAction = {
  EvidenceRead: "evidence.read",
  ExportsRead: "exports.read",
  PolicyPublish: "policy.publish",
} as const;
export type KeyAccessRequestDeniedAction = ClosedEnum<
  typeof KeyAccessRequestDeniedAction
>;

export type KeyAccessRequest = {
  /**
   * Explicit restrictions that override scope grants. An empty list restores the access supplied by the scopes. Rotation preserves these restrictions.
   */
  deniedActions: Array<KeyAccessRequestDeniedAction>;
};

/** @internal */
export const KeyAccessRequestDeniedAction$outboundSchema: z.ZodMiniEnum<
  typeof KeyAccessRequestDeniedAction
> = z.enum(KeyAccessRequestDeniedAction);

/** @internal */
export type KeyAccessRequest$Outbound = {
  denied_actions: Array<string>;
};

/** @internal */
export const KeyAccessRequest$outboundSchema: z.ZodMiniType<
  KeyAccessRequest$Outbound,
  KeyAccessRequest
> = z.pipe(
  z.object({
    deniedActions: z.array(KeyAccessRequestDeniedAction$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      deniedActions: "denied_actions",
    });
  }),
);

export function keyAccessRequestToJSON(
  keyAccessRequest: KeyAccessRequest,
): string {
  return JSON.stringify(
    KeyAccessRequest$outboundSchema.parse(keyAccessRequest),
  );
}
