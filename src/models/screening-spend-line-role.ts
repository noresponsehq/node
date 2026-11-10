import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const ScreeningSpendLineRole = {
  Resolver: "resolver",
  Collector: "collector",
  Analyser: "analyser",
} as const;
export type ScreeningSpendLineRole = OpenEnum<typeof ScreeningSpendLineRole>;

/** @internal */
export const ScreeningSpendLineRole$inboundSchema: z.ZodMiniType<
  ScreeningSpendLineRole,
  unknown
> = openEnums.inboundSchema(ScreeningSpendLineRole);
