import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * IP country, phone country, breach countries and policy_context.region together.
 */
export const Country = {
  Consistent: "consistent",
  Mismatch: "mismatch",
  Unknown: "unknown",
} as const;
/**
 * IP country, phone country, breach countries and policy_context.region together.
 */
export type Country = OpenEnum<typeof Country>;

/** @internal */
export const Country$inboundSchema: z.ZodMiniType<Country, unknown> = openEnums
  .inboundSchema(Country);
/** @internal */
export const Country$outboundSchema: z.ZodMiniType<string, Country> = openEnums
  .outboundSchema(Country);
