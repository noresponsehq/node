import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const RiskDetailsEventKind = {
  Created: "created",
  LastActive: "last_active",
  Breached: "breached",
} as const;
export type RiskDetailsEventKind = OpenEnum<typeof RiskDetailsEventKind>;

/** @internal */
export const RiskDetailsEventKind$inboundSchema: z.ZodMiniType<
  RiskDetailsEventKind,
  unknown
> = openEnums.inboundSchema(RiskDetailsEventKind);
/** @internal */
export const RiskDetailsEventKind$outboundSchema: z.ZodMiniType<
  string,
  RiskDetailsEventKind
> = openEnums.outboundSchema(RiskDetailsEventKind);
