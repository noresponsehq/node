import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * A NoResponse source: github (GitHub accounts), phone (the phone lookup), breach (breach exposure), rdap (the email domain's registration), mx (the email domain's mail servers), ipintel (IP intelligence) or an email account source that searches one platform for an account by email address (adobe, nvidia, wix, life360, zapier, google). google runs only for Gmail addresses.
 */
export const SourceId = {
  Github: "github",
  Phone: "phone",
  Breach: "breach",
  Rdap: "rdap",
  Mx: "mx",
  Ipintel: "ipintel",
  Adobe: "adobe",
  Nvidia: "nvidia",
  Wix: "wix",
  Life360: "life360",
  Zapier: "zapier",
  Google: "google",
} as const;
/**
 * A NoResponse source: github (GitHub accounts), phone (the phone lookup), breach (breach exposure), rdap (the email domain's registration), mx (the email domain's mail servers), ipintel (IP intelligence) or an email account source that searches one platform for an account by email address (adobe, nvidia, wix, life360, zapier, google). google runs only for Gmail addresses.
 */
export type SourceId = OpenEnum<typeof SourceId>;

/** @internal */
export const SourceId$inboundSchema: z.ZodMiniType<SourceId, unknown> =
  openEnums.inboundSchema(SourceId);
/** @internal */
export const SourceId$outboundSchema: z.ZodMiniType<string, SourceId> =
  openEnums.outboundSchema(SourceId);
