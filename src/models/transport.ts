import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * Where this context was derived. Backend is the trusted integration path; browser values are treated as weak hints. provider_hook is a hosted provider hook (an Auth0 or WorkOS Action) calling at hook_point; it needs hook_point and verified false, and its authentication facts are not scored.
 */
export const Transport = {
  Backend: "backend",
  Browser: "browser",
  ProviderHook: "provider_hook",
} as const;
/**
 * Where this context was derived. Backend is the trusted integration path; browser values are treated as weak hints. provider_hook is a hosted provider hook (an Auth0 or WorkOS Action) calling at hook_point; it needs hook_point and verified false, and its authentication facts are not scored.
 */
export type Transport = ClosedEnum<typeof Transport>;

/** @internal */
export const Transport$outboundSchema: z.ZodMiniEnum<typeof Transport> = z.enum(
  Transport,
);
