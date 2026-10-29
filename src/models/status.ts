import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Processing state, separate from evidence coverage. complete: final; nothing is still running, but unsupported, failed or unanswered lanes remain in incomplete_sources. partial: a recommendation exists and evidence is incomplete; assessment_url identifies continuing work when present. pending: no recommendation yet; poll or wait for the webhook. Finished processing does not mean all sources answered.
 */
export const Status = {
  Complete: "complete",
  Partial: "partial",
  Pending: "pending",
} as const;
/**
 * Processing state, separate from evidence coverage. complete: final; nothing is still running, but unsupported, failed or unanswered lanes remain in incomplete_sources. partial: a recommendation exists and evidence is incomplete; assessment_url identifies continuing work when present. pending: no recommendation yet; poll or wait for the webhook. Finished processing does not mean all sources answered.
 */
export type Status = OpenEnum<typeof Status>;

/** @internal */
export const Status$inboundSchema: z.ZodMiniType<Status, unknown> = openEnums
  .inboundSchema(Status);
/** @internal */
export const Status$outboundSchema: z.ZodMiniType<string, Status> = openEnums
  .outboundSchema(Status);
