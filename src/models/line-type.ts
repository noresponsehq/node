import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const LineType = {
  Mobile: "mobile",
  Voip: "voip",
  Landline: "landline",
  TollFree: "toll_free",
  Other: "other",
} as const;
export type LineType = OpenEnum<typeof LineType>;

/** @internal */
export const LineType$inboundSchema: z.ZodMiniType<LineType, unknown> =
  openEnums.inboundSchema(LineType);
