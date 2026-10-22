import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * pre_registration runs before the user exists; post_login runs after a successful sign-in.
 */
export const IntegrationHookPoint = {
  PreRegistration: "pre_registration",
  PostLogin: "post_login",
} as const;
/**
 * pre_registration runs before the user exists; post_login runs after a successful sign-in.
 */
export type IntegrationHookPoint = OpenEnum<typeof IntegrationHookPoint>;

/** @internal */
export const IntegrationHookPoint$inboundSchema: z.ZodMiniType<
  IntegrationHookPoint,
  unknown
> = openEnums.inboundSchema(IntegrationHookPoint);
/** @internal */
export const IntegrationHookPoint$outboundSchema: z.ZodMiniType<
  string,
  IntegrationHookPoint
> = openEnums.outboundSchema(IntegrationHookPoint);
