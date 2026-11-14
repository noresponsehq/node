import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  RecordRemaining,
  RecordRemaining$inboundSchema,
} from "./record-remaining.js";
import { RecordT, RecordT$inboundSchema } from "./record.js";
import { RiskDetails, RiskDetails$inboundSchema } from "./risk-details.js";
import { RiskSummary, RiskSummary$inboundSchema } from "./risk-summary.js";
import {
  ScreeningLookupCheck,
  ScreeningLookupCheck$inboundSchema,
} from "./screening-lookup-check.js";

/**
 * What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.
 */
export type ScreeningLookup = {
  /**
   * Each lane each identifier was looked up in, identifiers in the order email, phone, username and lanes in the order accounts, phone, breach, domain. Every lane the person's identifiers are looked up in is listed: one that no source answered, or that no source could be asked in, is not_covered. Empty when the person has no email, phone or handle to look up.
   */
  checks: Array<ScreeningLookupCheck>;
  /**
   * A few typed facts per identifier: an assessment's risk.summary, and a screened person's lookup summary. Every fact is optional: absent means the evidence did not answer and makes no claim, while false or 0 is a definite answer.
   */
  summary?: RiskSummary | undefined;
  /**
   * Merged observations behind the summary, served only to a caller who may read evidence: no provider, source, origin, raw breach record or score.
   */
  details?: RiskDetails | undefined;
  /**
   * What each source answered, whole, each answer once: every field of each account a connector found, and every column of each breach row the person's email or usernames matched, under the source's own names, and what each search a person started found, each match naming its search. Anyone who may read the person reads them: no extra permission applies, breach passwords and hashes included.
   */
  records?: Array<RecordT> | undefined;
  /**
   * For each search and source whose matched rows records leave out, how many: a breach search returns at most 20 rows of a table and 100 in all, from its first 64 tables by name. A search a person starts on one table of its source fetches the rest of that table, up to 100 rows. Absent when records hold every matched row.
   */
  remaining?: Array<RecordRemaining> | undefined;
  /**
   * When the lookups ran.
   */
  lookedAt: string;
};

/** @internal */
export const ScreeningLookup$inboundSchema: z.ZodMiniType<
  ScreeningLookup,
  unknown
> = z.pipe(
  z.object({
    checks: z.array(ScreeningLookupCheck$inboundSchema),
    summary: types.optional(RiskSummary$inboundSchema),
    details: types.optional(RiskDetails$inboundSchema),
    records: types.optional(z.array(RecordT$inboundSchema)),
    remaining: types.optional(z.array(RecordRemaining$inboundSchema)),
    looked_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "looked_at": "lookedAt",
    });
  }),
);

export function screeningLookupFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningLookup, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningLookup$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningLookup' from JSON`,
  );
}
