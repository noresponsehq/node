import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  CustomerExportRequestFilterOutcome,
  CustomerExportRequestFilterOutcome$outboundSchema,
} from "./customer-export-request-filter-outcome.js";
import { Environment, Environment$outboundSchema } from "./environment.js";

export type CustomerExportRequestFilter = {
  action?: string | undefined;
  actor?: string | undefined;
  targetType?: string | undefined;
  targetId?: string | undefined;
  environment?: Environment | undefined;
  outcome?: CustomerExportRequestFilterOutcome | undefined;
  since?: string | undefined;
  until?: string | undefined;
};

/** @internal */
export type CustomerExportRequestFilter$Outbound = {
  action?: string | undefined;
  actor?: string | undefined;
  target_type?: string | undefined;
  target_id?: string | undefined;
  environment?: string | undefined;
  outcome?: string | undefined;
  since?: string | undefined;
  until?: string | undefined;
};

/** @internal */
export const CustomerExportRequestFilter$outboundSchema: z.ZodMiniType<
  CustomerExportRequestFilter$Outbound,
  CustomerExportRequestFilter
> = z.pipe(
  z.object({
    action: z.optional(z.string()),
    actor: z.optional(z.string()),
    targetType: z.optional(z.string()),
    targetId: z.optional(z.string()),
    environment: z.optional(Environment$outboundSchema),
    outcome: z.optional(CustomerExportRequestFilterOutcome$outboundSchema),
    since: z.optional(z.string()),
    until: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      targetType: "target_type",
      targetId: "target_id",
    });
  }),
);

export function customerExportRequestFilterToJSON(
  customerExportRequestFilter: CustomerExportRequestFilter,
): string {
  return JSON.stringify(
    CustomerExportRequestFilter$outboundSchema.parse(
      customerExportRequestFilter,
    ),
  );
}
