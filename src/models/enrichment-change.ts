import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { ClosedEnum } from "../types/enums.js";
import {
  EnrichmentMode,
  EnrichmentMode$outboundSchema,
} from "./enrichment-mode.js";

export const EnrichmentChangeKind = {
  Username: "username",
  Email: "email",
  Phone: "phone",
} as const;
export type EnrichmentChangeKind = ClosedEnum<typeof EnrichmentChangeKind>;

/**
 * A change to enrichment. A field left out keeps the value in force; max_spend or deadline null removes the bound.
 */
export type EnrichmentChange = {
  /**
   * off: enrichment starts no search and suggests none. suggest: enrichment starts no search by itself, and the person report lists the searches it would start in suggested_searches. automatic: after a workspace person's own investigation or a group's screening, and each time a search on that person finishes, enrichment starts searches by itself. A group takes suggest while the workspace has not set a mode.
   */
  mode?: EnrichmentMode | undefined;
  /**
   * Enrichment searches values only from records more likely than this to be the person's, 0 to 0.99.
   */
  minLikelihood?: number | undefined;
  /**
   * The kinds of value enrichment searches: distinctive usernames, and email addresses and phone numbers, which belong to one person each.
   */
  kinds?: Array<EnrichmentChangeKind> | undefined;
  /**
   * The most enrichment may spend on a person from one investigation, in minor units of USD (cents): each search it started after that investigation started counts its estimate or what it spent, whichever is more. At the bound enrichment starts nothing more for that investigation. null: only the environment's screening_daily_cap bounds it.
   */
  maxSpend?: number | null | undefined;
  /**
   * How long enrichment may start searches after an investigation starts, 60 to 2592000 seconds. null: no deadline.
   */
  deadline?: number | null | undefined;
};

/** @internal */
export const EnrichmentChangeKind$outboundSchema: z.ZodMiniEnum<
  typeof EnrichmentChangeKind
> = z.enum(EnrichmentChangeKind);

/** @internal */
export type EnrichmentChange$Outbound = {
  mode?: string | undefined;
  min_likelihood?: number | undefined;
  kinds?: Array<string> | undefined;
  max_spend?: number | null | undefined;
  deadline?: number | null | undefined;
};

/** @internal */
export const EnrichmentChange$outboundSchema: z.ZodMiniType<
  EnrichmentChange$Outbound,
  EnrichmentChange
> = z.pipe(
  z.object({
    mode: z.optional(EnrichmentMode$outboundSchema),
    minLikelihood: z.optional(z.number()),
    kinds: z.optional(z.array(EnrichmentChangeKind$outboundSchema)),
    maxSpend: z.optional(z.nullable(z.int())),
    deadline: z.optional(z.nullable(z.int())),
  }),
  z.transform((v) => {
    return remap$(v, {
      minLikelihood: "min_likelihood",
      maxSpend: "max_spend",
    });
  }),
);

export function enrichmentChangeToJSON(
  enrichmentChange: EnrichmentChange,
): string {
  return JSON.stringify(
    EnrichmentChange$outboundSchema.parse(enrichmentChange),
  );
}
