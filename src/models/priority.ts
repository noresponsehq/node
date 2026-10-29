import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const Priority = {
  Low: "low",
  Normal: "normal",
  High: "high",
  Urgent: "urgent",
} as const;
export type Priority = OpenEnum<typeof Priority>;

/** @internal */
export const Priority$inboundSchema: z.ZodMiniType<Priority, unknown> =
  openEnums.inboundSchema(Priority);
/** @internal */
export const Priority$outboundSchema: z.ZodMiniType<string, Priority> =
  openEnums.outboundSchema(Priority);
