import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

export type AuditStreamRequest = {
  endpointId: string;
  actions?: Array<string> | undefined;
};

/** @internal */
export type AuditStreamRequest$Outbound = {
  endpoint_id: string;
  actions?: Array<string> | undefined;
};

/** @internal */
export const AuditStreamRequest$outboundSchema: z.ZodMiniType<
  AuditStreamRequest$Outbound,
  AuditStreamRequest
> = z.pipe(
  z.object({
    endpointId: z.string(),
    actions: z.optional(z.array(z.string())),
  }),
  z.transform((v) => {
    return remap$(v, {
      endpointId: "endpoint_id",
    });
  }),
);

export function auditStreamRequestToJSON(
  auditStreamRequest: AuditStreamRequest,
): string {
  return JSON.stringify(
    AuditStreamRequest$outboundSchema.parse(auditStreamRequest),
  );
}
