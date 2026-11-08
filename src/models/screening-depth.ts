import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const ScreeningDepth = {
  Standard: "standard",
} as const;
export type ScreeningDepth = OpenEnum<typeof ScreeningDepth>;

/** @internal */
export const ScreeningDepth$inboundSchema: z.ZodMiniType<
  ScreeningDepth,
  unknown
> = openEnums.inboundSchema(ScreeningDepth);
/** @internal */
export const ScreeningDepth$outboundSchema: z.ZodMiniType<
  string,
  ScreeningDepth
> = openEnums.outboundSchema(ScreeningDepth);
