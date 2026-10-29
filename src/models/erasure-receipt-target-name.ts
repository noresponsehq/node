import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const ErasureReceiptTargetName = {
  Serving: "serving",
  Outbox: "outbox",
  Cache: "cache",
  DownstreamProjection: "downstream_projection",
} as const;
export type ErasureReceiptTargetName = OpenEnum<
  typeof ErasureReceiptTargetName
>;

/** @internal */
export const ErasureReceiptTargetName$inboundSchema: z.ZodMiniType<
  ErasureReceiptTargetName,
  unknown
> = openEnums.inboundSchema(ErasureReceiptTargetName);
