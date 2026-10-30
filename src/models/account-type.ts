import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * personal, or business: an account a company or school manages.
 */
export const AccountType = {
  Personal: "personal",
  Business: "business",
} as const;
/**
 * personal, or business: an account a company or school manages.
 */
export type AccountType = OpenEnum<typeof AccountType>;

/** @internal */
export const AccountType$inboundSchema: z.ZodMiniType<AccountType, unknown> =
  openEnums.inboundSchema(AccountType);
/** @internal */
export const AccountType$outboundSchema: z.ZodMiniType<string, AccountType> =
  openEnums.outboundSchema(AccountType);
