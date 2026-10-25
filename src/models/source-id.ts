import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * A NoResponse source: github (GitHub accounts), phone (the phone lookup), breach (breach exposure), rdap (the email domain's registration), mx (the email domain's mail servers) or ipintel (IP intelligence).
 */
export const SourceId = {
  Github: "github",
  Phone: "phone",
  Breach: "breach",
  Rdap: "rdap",
  Mx: "mx",
  Ipintel: "ipintel",
} as const;
/**
 * A NoResponse source: github (GitHub accounts), phone (the phone lookup), breach (breach exposure), rdap (the email domain's registration), mx (the email domain's mail servers) or ipintel (IP intelligence).
 */
export type SourceId = OpenEnum<typeof SourceId>;

/** @internal */
export const SourceId$inboundSchema: z.ZodMiniType<SourceId, unknown> =
  openEnums.inboundSchema(SourceId);
/** @internal */
export const SourceId$outboundSchema: z.ZodMiniType<string, SourceId> =
  openEnums.outboundSchema(SourceId);
