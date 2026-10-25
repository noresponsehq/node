import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * An evidence lane: accounts (account presence for email and username), phone, breach, domain (the email domain's registration) and ip.
 */
export const Lane = {
  Accounts: "accounts",
  Phone: "phone",
  Breach: "breach",
  Domain: "domain",
  Ip: "ip",
} as const;
/**
 * An evidence lane: accounts (account presence for email and username), phone, breach, domain (the email domain's registration) and ip.
 */
export type Lane = OpenEnum<typeof Lane>;

/** @internal */
export const Lane$inboundSchema: z.ZodMiniType<Lane, unknown> = openEnums
  .inboundSchema(Lane);
/** @internal */
export const Lane$outboundSchema: z.ZodMiniType<string, Lane> = openEnums
  .outboundSchema(Lane);
