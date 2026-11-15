import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

/**
 * The value to search again, named by the record and field that hold it rather than sent again.
 */
export type SearchRequest = {
  /**
   * One of the person's records: a lookup's, a profile's or one an earlier search found.
   */
  recordId: string;
  /**
   * The name of the record's field whose value to search. Its kind must be email, phone, username, person_name, password, hash, ip or domain, and it must have a value: a field the source masked or that could not be cleaned is not searched.
   */
  field: string;
  /**
   * Search only this breach table, as a remaining entry names it, to fetch the rows an earlier search left out. Not for a phone.
   */
  table?: string | undefined;
};

/** @internal */
export type SearchRequest$Outbound = {
  record_id: string;
  field: string;
  table?: string | undefined;
};

/** @internal */
export const SearchRequest$outboundSchema: z.ZodMiniType<
  SearchRequest$Outbound,
  SearchRequest
> = z.pipe(
  z.object({
    recordId: z.string(),
    field: z.string(),
    table: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      recordId: "record_id",
    });
  }),
);

export function searchRequestToJSON(searchRequest: SearchRequest): string {
  return JSON.stringify(SearchRequest$outboundSchema.parse(searchRequest));
}
