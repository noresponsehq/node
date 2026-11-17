import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  EnrichmentMode,
  EnrichmentMode$inboundSchema,
} from "./enrichment-mode.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export const EnrichmentKind = {
  Username: "username",
  Email: "email",
  Phone: "phone",
} as const;
export type EnrichmentKind = OpenEnum<typeof EnrichmentKind>;

/**
 * How enrichment searches the values that a workspace person's own investigation (POST /v1/investigations) and a group's screening find. Defaults: mode automatic, min_likelihood 0.5, kinds username, max_spend null and deadline null. Group screening follows the same setting, but takes mode suggest while the workspace has not set a mode. An investigation request may override each field for that investigation. A change applies to the next search enrichment starts, investigations already run included. Enrichment also keeps to limits of its own: each value once per person (once more if that search failed), at most 5 searches from one search's records, 20 per person and 6 searches deep.
 */
export type Enrichment = {
  /**
   * off: enrichment starts no search and suggests none. suggest: enrichment starts no search by itself, and the person report lists the searches it would start in suggested_searches. automatic: after a workspace person's own investigation or a group's screening, and each time a search on that person finishes, enrichment starts searches by itself. A group takes suggest while the workspace has not set a mode.
   */
  mode: EnrichmentMode;
  /**
   * Enrichment searches values only from records more likely than this to be the person's, 0 to 0.99.
   */
  minLikelihood: number;
  /**
   * The kinds of value enrichment searches: distinctive usernames, and email addresses and phone numbers, which belong to one person each.
   */
  kinds: Array<EnrichmentKind>;
  /**
   * The most enrichment may spend on a person from one investigation, in minor units of USD (cents): each search it started after that investigation started counts its estimate or what it spent, whichever is more. At the bound enrichment starts nothing more for that investigation. null: only the environment's screening_daily_cap bounds it.
   */
  maxSpend: number | null;
  /**
   * How long enrichment may start searches after an investigation starts, 60 to 2592000 seconds. null: no deadline.
   */
  deadline: number | null;
};

/** @internal */
export const EnrichmentKind$inboundSchema: z.ZodMiniType<
  EnrichmentKind,
  unknown
> = openEnums.inboundSchema(EnrichmentKind);

/** @internal */
export const Enrichment$inboundSchema: z.ZodMiniType<Enrichment, unknown> = z
  .pipe(
    z.object({
      mode: EnrichmentMode$inboundSchema,
      min_likelihood: types.number(),
      kinds: z.array(EnrichmentKind$inboundSchema),
      max_spend: types.nullable(types.number()),
      deadline: types.nullable(types.number()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "min_likelihood": "minLikelihood",
        "max_spend": "maxSpend",
      });
    }),
  );

export function enrichmentFromJSON(
  jsonString: string,
): SafeParseResult<Enrichment, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Enrichment$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Enrichment' from JSON`,
  );
}
