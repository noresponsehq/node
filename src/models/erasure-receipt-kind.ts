import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const ErasureReceiptKind = {
  Assessment: "assessment",
  Account: "account",
  Workspace: "workspace",
} as const;
export type ErasureReceiptKind = OpenEnum<typeof ErasureReceiptKind>;

/** @internal */
export const ErasureReceiptKind$inboundSchema: z.ZodMiniType<
  ErasureReceiptKind,
  unknown
> = openEnums.inboundSchema(ErasureReceiptKind);
