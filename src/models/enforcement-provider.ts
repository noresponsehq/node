import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The identity provider the action ran in; custom for the workspace's own user store.
 */
export const EnforcementProvider = {
  Clerk: "clerk",
  Workos: "workos",
  Auth0: "auth0",
  Custom: "custom",
} as const;
/**
 * The identity provider the action ran in; custom for the workspace's own user store.
 */
export type EnforcementProvider = OpenEnum<typeof EnforcementProvider>;

/** @internal */
export const EnforcementProvider$inboundSchema: z.ZodMiniType<
  EnforcementProvider,
  unknown
> = openEnums.inboundSchema(EnforcementProvider);
/** @internal */
export const EnforcementProvider$outboundSchema: z.ZodMiniType<
  string,
  EnforcementProvider
> = openEnums.outboundSchema(EnforcementProvider);
