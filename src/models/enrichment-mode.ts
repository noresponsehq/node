import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * off: enrichment starts no search. suggest: enrichment starts no search by itself. automatic: after a workspace person's own investigation, and each time a search on that person finishes, enrichment starts searches by itself.
 */
export const EnrichmentMode = {
  Off: "off",
  Suggest: "suggest",
  Automatic: "automatic",
} as const;
/**
 * off: enrichment starts no search. suggest: enrichment starts no search by itself. automatic: after a workspace person's own investigation, and each time a search on that person finishes, enrichment starts searches by itself.
 */
export type EnrichmentMode = OpenEnum<typeof EnrichmentMode>;

/** @internal */
export const EnrichmentMode$inboundSchema: z.ZodMiniType<
  EnrichmentMode,
  unknown
> = openEnums.inboundSchema(EnrichmentMode);
/** @internal */
export const EnrichmentMode$outboundSchema: z.ZodMiniType<
  string,
  EnrichmentMode
> = openEnums.outboundSchema(EnrichmentMode);
