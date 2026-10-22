import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The authentication provider that calls the endpoint.
 */
export const IntegrationPlatform = {
  Workos: "workos",
  Auth0: "auth0",
} as const;
/**
 * The authentication provider that calls the endpoint.
 */
export type IntegrationPlatform = OpenEnum<typeof IntegrationPlatform>;

/** @internal */
export const IntegrationPlatform$inboundSchema: z.ZodMiniType<
  IntegrationPlatform,
  unknown
> = openEnums.inboundSchema(IntegrationPlatform);
/** @internal */
export const IntegrationPlatform$outboundSchema: z.ZodMiniType<
  string,
  IntegrationPlatform
> = openEnums.outboundSchema(IntegrationPlatform);
