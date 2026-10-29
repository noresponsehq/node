import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * assessments only.
 */
export const UsageCountFlow = {
  AccountCreation: "account_creation",
  Login: "login",
  Purchase: "purchase",
} as const;
/**
 * assessments only.
 */
export type UsageCountFlow = OpenEnum<typeof UsageCountFlow>;

/** @internal */
export const UsageCountFlow$inboundSchema: z.ZodMiniType<
  UsageCountFlow,
  unknown
> = openEnums.inboundSchema(UsageCountFlow);
