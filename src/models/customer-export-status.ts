import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const CustomerExportStatus = {
  Queued: "queued",
  Running: "running",
  Completed: "completed",
  Failed: "failed",
  Cancelled: "cancelled",
  Expired: "expired",
} as const;
export type CustomerExportStatus = OpenEnum<typeof CustomerExportStatus>;

/** @internal */
export const CustomerExportStatus$inboundSchema: z.ZodMiniType<
  CustomerExportStatus,
  unknown
> = openEnums.inboundSchema(CustomerExportStatus);
