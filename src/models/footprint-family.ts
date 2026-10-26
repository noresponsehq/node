import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The source-neutral kind of evidence: account_presence (an account found on a site), auth_provider (the account at your auth provider), breach (breach and credential tables), breach_abuse (abuse and fraud communities' tables) and code_hosting (a code hosting profile).
 */
export const FootprintFamily = {
  AccountPresence: "account_presence",
  AuthProvider: "auth_provider",
  Breach: "breach",
  BreachAbuse: "breach_abuse",
  CodeHosting: "code_hosting",
} as const;
/**
 * The source-neutral kind of evidence: account_presence (an account found on a site), auth_provider (the account at your auth provider), breach (breach and credential tables), breach_abuse (abuse and fraud communities' tables) and code_hosting (a code hosting profile).
 */
export type FootprintFamily = OpenEnum<typeof FootprintFamily>;

/** @internal */
export const FootprintFamily$inboundSchema: z.ZodMiniType<
  FootprintFamily,
  unknown
> = openEnums.inboundSchema(FootprintFamily);
/** @internal */
export const FootprintFamily$outboundSchema: z.ZodMiniType<
  string,
  FootprintFamily
> = openEnums.outboundSchema(FootprintFamily);
