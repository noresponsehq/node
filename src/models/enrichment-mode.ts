import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * off: enrichment starts no search and suggests none. suggest: enrichment starts no search by itself, and the person report lists the searches it would start in suggested_searches. automatic: after a workspace person's own investigation or a group's screening, and each time a search on that person finishes, enrichment starts searches by itself. A group takes suggest while the workspace has not set a mode.
 */
export const EnrichmentMode = {
  Off: "off",
  Suggest: "suggest",
  Automatic: "automatic",
} as const;
/**
 * off: enrichment starts no search and suggests none. suggest: enrichment starts no search by itself, and the person report lists the searches it would start in suggested_searches. automatic: after a workspace person's own investigation or a group's screening, and each time a search on that person finishes, enrichment starts searches by itself. A group takes suggest while the workspace has not set a mode.
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
