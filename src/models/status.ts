import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.
 */
export const Status = {
  Complete: "complete",
  Partial: "partial",
  Pending: "pending",
} as const;
/**
 * complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.
 */
export type Status = OpenEnum<typeof Status>;

/** @internal */
export const Status$inboundSchema: z.ZodMiniType<Status, unknown> = openEnums
  .inboundSchema(Status);
/** @internal */
export const Status$outboundSchema: z.ZodMiniType<string, Status> = openEnums
  .outboundSchema(Status);
