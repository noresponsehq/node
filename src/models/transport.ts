import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Where the context was derived: backend (also when the request named no transport), browser, or provider_hook for a hosted provider hook.
 */
export const Transport = {
  Backend: "backend",
  Browser: "browser",
  ProviderHook: "provider_hook",
} as const;
/**
 * Where the context was derived: backend (also when the request named no transport), browser, or provider_hook for a hosted provider hook.
 */
export type Transport = OpenEnum<typeof Transport>;

/** @internal */
export const Transport$inboundSchema: z.ZodMiniType<Transport, unknown> =
  openEnums.inboundSchema(Transport);
/** @internal */
export const Transport$outboundSchema: z.ZodMiniType<string, Transport> =
  openEnums.outboundSchema(Transport);
