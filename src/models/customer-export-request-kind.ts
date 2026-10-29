import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const CustomerExportRequestKind = {
  Account: "account",
  Audit: "audit",
} as const;
export type CustomerExportRequestKind = OpenEnum<
  typeof CustomerExportRequestKind
>;

/** @internal */
export const CustomerExportRequestKind$inboundSchema: z.ZodMiniType<
  CustomerExportRequestKind,
  unknown
> = openEnums.inboundSchema(CustomerExportRequestKind);
/** @internal */
export const CustomerExportRequestKind$outboundSchema: z.ZodMiniType<
  string,
  CustomerExportRequestKind
> = openEnums.outboundSchema(CustomerExportRequestKind);
