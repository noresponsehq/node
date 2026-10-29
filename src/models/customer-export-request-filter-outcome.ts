import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const CustomerExportRequestFilterOutcome = {
  Succeeded: "succeeded",
  Denied: "denied",
} as const;
export type CustomerExportRequestFilterOutcome = OpenEnum<
  typeof CustomerExportRequestFilterOutcome
>;

/** @internal */
export const CustomerExportRequestFilterOutcome$inboundSchema: z.ZodMiniType<
  CustomerExportRequestFilterOutcome,
  unknown
> = openEnums.inboundSchema(CustomerExportRequestFilterOutcome);
/** @internal */
export const CustomerExportRequestFilterOutcome$outboundSchema: z.ZodMiniType<
  string,
  CustomerExportRequestFilterOutcome
> = openEnums.outboundSchema(CustomerExportRequestFilterOutcome);
