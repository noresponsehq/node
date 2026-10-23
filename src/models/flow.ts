import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The customer event an assessment is made for: signup (a new account), login (a returning sign-in) or purchase (a payment or credit grant). The account's risk is reported with the decision for this flow.
 */
export const Flow = {
  Signup: "signup",
  Login: "login",
  Purchase: "purchase",
} as const;
/**
 * The customer event an assessment is made for: signup (a new account), login (a returning sign-in) or purchase (a payment or credit grant). The account's risk is reported with the decision for this flow.
 */
export type Flow = OpenEnum<typeof Flow>;

/** @internal */
export const Flow$inboundSchema: z.ZodMiniType<Flow, unknown> = openEnums
  .inboundSchema(Flow);
/** @internal */
export const Flow$outboundSchema: z.ZodMiniType<string, Flow> = openEnums
  .outboundSchema(Flow);
