import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const ReviewStatus = {
  Open: "open",
  InProgress: "in_progress",
  Resolved: "resolved",
} as const;
export type ReviewStatus = OpenEnum<typeof ReviewStatus>;

/** @internal */
export const ReviewStatus$inboundSchema: z.ZodMiniType<ReviewStatus, unknown> =
  openEnums.inboundSchema(ReviewStatus);
/** @internal */
export const ReviewStatus$outboundSchema: z.ZodMiniType<string, ReviewStatus> =
  openEnums.outboundSchema(ReviewStatus);
