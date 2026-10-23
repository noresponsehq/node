import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The provider event a provider_hook context was sent for; absent for any other transport.
 */
export const HookPoint = {
  PreRegistration: "pre_registration",
  PostRegistration: "post_registration",
  PreLogin: "pre_login",
  PostLogin: "post_login",
  TokenIssuance: "token_issuance",
} as const;
/**
 * The provider event a provider_hook context was sent for; absent for any other transport.
 */
export type HookPoint = OpenEnum<typeof HookPoint>;

/** @internal */
export const HookPoint$inboundSchema: z.ZodMiniType<HookPoint, unknown> =
  openEnums.inboundSchema(HookPoint);
/** @internal */
export const HookPoint$outboundSchema: z.ZodMiniType<string, HookPoint> =
  openEnums.outboundSchema(HookPoint);
