import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
 */
export const Flow = {
  AccountCreation: "account_creation",
  Login: "login",
  Purchase: "purchase",
} as const;
/**
 * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
 */
export type Flow = OpenEnum<typeof Flow>;

/** @internal */
export const Flow$inboundSchema: z.ZodMiniType<Flow, unknown> = openEnums
  .inboundSchema(Flow);
/** @internal */
export const Flow$outboundSchema: z.ZodMiniType<string, Flow> = openEnums
  .outboundSchema(Flow);
