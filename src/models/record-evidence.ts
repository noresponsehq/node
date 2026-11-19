import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  RecordEvidenceSignal,
  RecordEvidenceSignal$inboundSchema,
} from "./record-evidence-signal.js";

/**
 * One item of evidence behind a record's likelihood.
 */
export type RecordEvidence = {
  /**
   * found_by: what found the record, which sets where its likelihood starts. agrees: a value the record shares with what the investigator gave or with a joined record. clashes: a birth date, full name, gender or country that differs from theirs.
   */
  signal: RecordEvidenceSignal;
  /**
   * For found_by, what the search looked up (email, phone, username, handle, name). Otherwise the kind of value compared, such as email, username, person_name, born, city or crypto_address.
   */
  kind?: string | undefined;
  /**
   * The record's own field that agreed or clashed, or for found_by the field the search matched.
   */
  field?: string | undefined;
  /**
   * given for what the investigator gave, or the id of the person's record it agreed or clashed with, or for found_by the record whose value the search looked up.
   */
  with?: string | undefined;
  /**
   * The field on the other side: the field of the given identity or of the record named by with.
   */
  withField?: string | undefined;
  /**
   * The item's weight in bits, to two places: log2 of how much likelier the evidence is for the same person than for a stranger. Positive raises the likelihood and negative lowers it.
   */
  bits: number;
};

/** @internal */
export const RecordEvidence$inboundSchema: z.ZodMiniType<
  RecordEvidence,
  unknown
> = z.pipe(
  z.object({
    signal: RecordEvidenceSignal$inboundSchema,
    kind: types.optional(types.string()),
    field: types.optional(types.string()),
    with: types.optional(types.string()),
    with_field: types.optional(types.string()),
    bits: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "with_field": "withField",
    });
  }),
);

export function recordEvidenceFromJSON(
  jsonString: string,
): SafeParseResult<RecordEvidence, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordEvidence$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordEvidence' from JSON`,
  );
}
