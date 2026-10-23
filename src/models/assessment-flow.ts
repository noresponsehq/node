import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * The customer event an assessment is made for: signup (a new account), login (a returning sign-in) or purchase (a payment or credit grant). The account's risk is reported with the decision for this flow.
 */
export const AssessmentFlow = {
  Signup: "signup",
  Login: "login",
  Purchase: "purchase",
} as const;
/**
 * The customer event an assessment is made for: signup (a new account), login (a returning sign-in) or purchase (a payment or credit grant). The account's risk is reported with the decision for this flow.
 */
export type AssessmentFlow = ClosedEnum<typeof AssessmentFlow>;

/** @internal */
export const AssessmentFlow$outboundSchema: z.ZodMiniEnum<
  typeof AssessmentFlow
> = z.enum(AssessmentFlow);
