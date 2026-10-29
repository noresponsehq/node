import * as z from "zod/v4-mini";

/**
 * Send an empty JSON object to cancel or retry a customer export.
 */
export type CustomerExportActionRequest = {};

/** @internal */
export type CustomerExportActionRequest$Outbound = {};

/** @internal */
export const CustomerExportActionRequest$outboundSchema: z.ZodMiniType<
  CustomerExportActionRequest$Outbound,
  CustomerExportActionRequest
> = z.object({});

export function customerExportActionRequestToJSON(
  customerExportActionRequest: CustomerExportActionRequest,
): string {
  return JSON.stringify(
    CustomerExportActionRequest$outboundSchema.parse(
      customerExportActionRequest,
    ),
  );
}
