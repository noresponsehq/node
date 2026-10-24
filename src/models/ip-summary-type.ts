import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The address's network type.
 */
export const IpSummaryType = {
  Residential: "residential",
  Hosting: "hosting",
  Vpn: "vpn",
  Proxy: "proxy",
  Tor: "tor",
  Mobile: "mobile",
  Unknown: "unknown",
} as const;
/**
 * The address's network type.
 */
export type IpSummaryType = OpenEnum<typeof IpSummaryType>;

/** @internal */
export const IpSummaryType$inboundSchema: z.ZodMiniType<
  IpSummaryType,
  unknown
> = openEnums.inboundSchema(IpSummaryType);
/** @internal */
export const IpSummaryType$outboundSchema: z.ZodMiniType<
  string,
  IpSummaryType
> = openEnums.outboundSchema(IpSummaryType);
