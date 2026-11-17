import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  SuggestedSearchKind,
  SuggestedSearchKind$inboundSchema,
} from "./suggested-search-kind.js";

/**
 * A search enrichment would start: a distinctive or unique value of a likely record, not yet searched for the person. A person starts it with POST .../searches, naming the record and the field.
 */
export type SuggestedSearch = {
  /**
   * The lookup record whose value enrichment would search. It is among the report's lookup records.
   */
  recordId: string;
  /**
   * The field of that record that holds the value. Send record_id and field to POST .../searches to start the search.
   */
  field: string;
  /**
   * The kind of the value: one of the kinds the environment's enrichment setting names.
   */
  kind: SuggestedSearchKind;
  /**
   * The likelihood of the record that holds the value, from 0.01 to 0.99. Enrichment suggests a value only from a record more likely than the setting's min_likelihood, the likeliest first.
   */
  likelihood: number;
};

/** @internal */
export const SuggestedSearch$inboundSchema: z.ZodMiniType<
  SuggestedSearch,
  unknown
> = z.pipe(
  z.object({
    record_id: types.string(),
    field: types.string(),
    kind: SuggestedSearchKind$inboundSchema,
    likelihood: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "record_id": "recordId",
    });
  }),
);

export function suggestedSearchFromJSON(
  jsonString: string,
): SafeParseResult<SuggestedSearch, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SuggestedSearch$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SuggestedSearch' from JSON`,
  );
}
