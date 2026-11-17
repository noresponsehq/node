import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { RecordField, RecordField$inboundSchema } from "./record-field.js";
import { RecordMatch, RecordMatch$inboundSchema } from "./record-match.js";
import { RecordSource, RecordSource$inboundSchema } from "./record-source.js";
import { Verdict, Verdict$inboundSchema } from "./verdict.js";

/**
 * One answer from one source: where it came from, what found it and every field it holds. A person's lookup records also say how likely each is the person.
 */
export type RecordT = {
  /**
   * Made from the source and the fields' names and original values, so the same answer found twice is one record with the same id. Its fields are typed as its latest finding typed them.
   */
  id: string;
  /**
   * Where a record came from.
   */
  source: RecordSource;
  /**
   * Each kind of searched value that found the record.
   */
  matched: Array<RecordMatch>;
  /**
   * Every field the source returned, in the order the source's connector lists them; a breach row's columns in name order. Nothing is withheld: a breach row's passwords, hashes and salts are fields like any other.
   */
  fields: Array<RecordField>;
  /**
   * When the source last gave this answer.
   */
  observedAt: string;
  /**
   * How likely the record is the person it was found for, from 0.01 to 0.99, to two places. A record found by the person's own email or phone starts as theirs, and one found by a search of a value another record holds starts at that record's likelihood divided by one plus the records its search found on its site; any other starts lower the more people its search found on its site, or anywhere for a name search. Each value it shares with what is known of the person raises it, a rare value more than a common one, and a different birth date or full name lowers it. What is known is what the person's row gives and the values of their joined records: those found by their email or phone, those a reviewer joined and those whose likelihood reaches 0.9. Each record that joins adds its values and the rest are scored again until the joined records stop changing; a record whose likelihood falls below 0.9 is not joined and adds nothing, so a reviewer's rejection also undoes the joins that came through the rejected record. A record whose source kind starts with domain_ describes an email's domain, not the person, so it is not compared and adds nothing to what is known: it stays at 0.99 when the person's own email found it and at 0.5 otherwise. Present on a person's lookup records, with agreed, clashed and joined.
   */
  likelihood?: number | undefined;
  /**
   * The fields of this record whose values agreed with what is known of the person, by their field names, in the record's order. The value that found the record is not among them.
   */
  agreed?: Array<string> | undefined;
  /**
   * The fields of this record that clashed with what is known of the person: a birth date or a full name that differs from the person's.
   */
  clashed?: Array<string> | undefined;
  /**
   * Whether the record joins the person: its likelihood reached 0.9 or a reviewer joined it, and no reviewer rejected it. A record that does not join stays a lead.
   */
  joined?: boolean | undefined;
  /**
   * A reviewer's overrule (POST .../people/{person_id}/records), which decides joined whatever the likelihood and sticks for as long as a lookup finds the same record. Absent when nobody overruled it.
   */
  verdict?: Verdict | undefined;
};

/** @internal */
export const RecordT$inboundSchema: z.ZodMiniType<RecordT, unknown> = z.pipe(
  z.object({
    id: types.string(),
    source: RecordSource$inboundSchema,
    matched: z.array(RecordMatch$inboundSchema),
    fields: z.array(RecordField$inboundSchema),
    observed_at: types.string(),
    likelihood: types.optional(types.number()),
    agreed: types.optional(z.array(types.string())),
    clashed: types.optional(z.array(types.string())),
    joined: types.optional(types.boolean()),
    verdict: types.optional(Verdict$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "observed_at": "observedAt",
    });
  }),
);

export function recordFromJSON(
  jsonString: string,
): SafeParseResult<RecordT, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordT$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordT' from JSON`,
  );
}
