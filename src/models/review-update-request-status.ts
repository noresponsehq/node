import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

export const ReviewUpdateRequestStatus = {
  Open: "open",
  InProgress: "in_progress",
} as const;
export type ReviewUpdateRequestStatus = ClosedEnum<
  typeof ReviewUpdateRequestStatus
>;

/** @internal */
export const ReviewUpdateRequestStatus$outboundSchema: z.ZodMiniEnum<
  typeof ReviewUpdateRequestStatus
> = z.enum(ReviewUpdateRequestStatus);
