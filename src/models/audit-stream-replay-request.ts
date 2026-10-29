import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

export type AuditStreamReplayRequest = {
  /**
   * Opaque, workspace-scoped webhook event id. A redelivery of the same event carries the same event_id, so consumers deduplicate on it.
   */
  eventId: string;
};

/** @internal */
export type AuditStreamReplayRequest$Outbound = {
  event_id: string;
};

/** @internal */
export const AuditStreamReplayRequest$outboundSchema: z.ZodMiniType<
  AuditStreamReplayRequest$Outbound,
  AuditStreamReplayRequest
> = z.pipe(
  z.object({
    eventId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      eventId: "event_id",
    });
  }),
);

export function auditStreamReplayRequestToJSON(
  auditStreamReplayRequest: AuditStreamReplayRequest,
): string {
  return JSON.stringify(
    AuditStreamReplayRequest$outboundSchema.parse(auditStreamReplayRequest),
  );
}
