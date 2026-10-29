import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const ErasureReceiptTargetStatus = {
  Pending: "pending",
  Completed: "completed",
} as const;
export type ErasureReceiptTargetStatus = OpenEnum<
  typeof ErasureReceiptTargetStatus
>;

/** @internal */
export const ErasureReceiptTargetStatus$inboundSchema: z.ZodMiniType<
  ErasureReceiptTargetStatus,
  unknown
> = openEnums.inboundSchema(ErasureReceiptTargetStatus);
