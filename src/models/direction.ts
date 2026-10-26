import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const Direction = {
  Raises: "raises",
  Lowers: "lowers",
  Neutral: "neutral",
} as const;
export type Direction = OpenEnum<typeof Direction>;

/** @internal */
export const Direction$inboundSchema: z.ZodMiniType<Direction, unknown> =
  openEnums.inboundSchema(Direction);
/** @internal */
export const Direction$outboundSchema: z.ZodMiniType<string, Direction> =
  openEnums.outboundSchema(Direction);
