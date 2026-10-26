import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const Agreement = {
  Match: "match",
  Partial: "partial",
  Mismatch: "mismatch",
} as const;
export type Agreement = OpenEnum<typeof Agreement>;

/** @internal */
export const Agreement$inboundSchema: z.ZodMiniType<Agreement, unknown> =
  openEnums.inboundSchema(Agreement);
/** @internal */
export const Agreement$outboundSchema: z.ZodMiniType<string, Agreement> =
  openEnums.outboundSchema(Agreement);
