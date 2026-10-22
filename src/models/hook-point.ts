import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * The provider event a provider_hook context was sent for. pre_registration runs before the user exists, so subject and the request's account_id may be absent there. Sent only with transport provider_hook.
 */
export const HookPoint = {
  PreRegistration: "pre_registration",
  PostRegistration: "post_registration",
  PreLogin: "pre_login",
  PostLogin: "post_login",
  TokenIssuance: "token_issuance",
} as const;
/**
 * The provider event a provider_hook context was sent for. pre_registration runs before the user exists, so subject and the request's account_id may be absent there. Sent only with transport provider_hook.
 */
export type HookPoint = ClosedEnum<typeof HookPoint>;

/** @internal */
export const HookPoint$outboundSchema: z.ZodMiniEnum<typeof HookPoint> = z.enum(
  HookPoint,
);
