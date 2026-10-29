import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const KeyKind = {
  Service: "service",
  Personal: "personal",
} as const;
export type KeyKind = OpenEnum<typeof KeyKind>;

/** @internal */
export const KeyKind$inboundSchema: z.ZodMiniType<KeyKind, unknown> = openEnums
  .inboundSchema(KeyKind);
/** @internal */
export const KeyKind$outboundSchema: z.ZodMiniType<string, KeyKind> = openEnums
  .outboundSchema(KeyKind);
