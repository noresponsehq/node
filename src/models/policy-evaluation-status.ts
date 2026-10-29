import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const PolicyEvaluationStatus = {
  Queued: "queued",
  Running: "running",
  Completed: "completed",
  Failed: "failed",
  Cancelled: "cancelled",
} as const;
export type PolicyEvaluationStatus = OpenEnum<typeof PolicyEvaluationStatus>;

/** @internal */
export const PolicyEvaluationStatus$inboundSchema: z.ZodMiniType<
  PolicyEvaluationStatus,
  unknown
> = openEnums.inboundSchema(PolicyEvaluationStatus);
