import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { ErrorCode, ErrorCode$inboundSchema } from "./error-code.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { SearchKind, SearchKind$inboundSchema } from "./search-kind.js";
import { SearchStatus, SearchStatus$inboundSchema } from "./search-status.js";

/**
 * One search on a value of one of a person's records, started by a person or by enrichment.
 */
export type Search = {
  searchId: string;
  /**
   * The record whose value led to the search.
   */
  recordId: string;
  /**
   * The field of that record that holds the value.
   */
  field: string;
  /**
   * The one breach table searched, when the search was of one table.
   */
  table?: string | undefined;
  /**
   * The kind of the value searched. A domain search finds the leaked rows of every email address at the domain.
   */
  kind: SearchKind;
  /**
   * The searched value. Empty in person reports when evidence.read is denied.
   */
  value: string;
  /**
   * A password or hash search is counting, then counted: rows says how many breach rows hold the value, and nothing runs until a person runs it (POST .../searches/{search_id}/run). Any other search is queued, then running. completed: every source it asked answered. partial: some did not. failed: none answered or none could be asked, which says nothing about whether the value is held anywhere.
   */
  status: SearchStatus;
  /**
   * How many breach rows hold the password or hash, counted before the search runs.
   */
  rows?: number | undefined;
  /**
   * How many sources the search asked: the breach search and the account and phone lookups that take the value's kind.
   */
  sources: number;
  /**
   * How many of them gave a definite answer, found or not found.
   */
  answered: number;
  /**
   * How many records the search found. They are among the person report's lookup records, each match naming this search.
   */
  found: number;
  /**
   * What the search may spend, in US cents, held against the environment's daily screening cap while it runs.
   */
  estimatedSpend: number;
  /**
   * What the search spent, in US cents, metered as screening work.
   */
  spent: number;
  /**
   * Why a failed search found nothing: its sources did not answer, none could be asked, or it could not run before its attempts were spent.
   */
  errorCode?: ErrorCode | undefined;
  /**
   * Who started the search: the member or key, or enrichment when the engine started it on a value an earlier result showed.
   */
  requestedBy: string;
  /**
   * The search that found the record this value came from. Absent when the record came from the person's investigation.
   */
  parentSearchId?: string | undefined;
  /**
   * How many searches lie between the person's investigation and this one, this one included: 1 for a value of a record the investigation found, 2 for a value of a record a depth-1 search found, and so on.
   */
  depth?: number | undefined;
  createdAt: string;
  finishedAt?: string | undefined;
};

/** @internal */
export const Search$inboundSchema: z.ZodMiniType<Search, unknown> = z.pipe(
  z.object({
    search_id: types.string(),
    record_id: types.string(),
    field: types.string(),
    table: types.optional(types.string()),
    kind: SearchKind$inboundSchema,
    value: types.string(),
    status: SearchStatus$inboundSchema,
    rows: types.optional(types.number()),
    sources: types.number(),
    answered: types.number(),
    found: types.number(),
    estimated_spend: types.number(),
    spent: types.number(),
    error_code: types.optional(ErrorCode$inboundSchema),
    requested_by: types.string(),
    parent_search_id: types.optional(types.string()),
    depth: types.optional(types.number()),
    created_at: types.string(),
    finished_at: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "search_id": "searchId",
      "record_id": "recordId",
      "estimated_spend": "estimatedSpend",
      "error_code": "errorCode",
      "requested_by": "requestedBy",
      "parent_search_id": "parentSearchId",
      "created_at": "createdAt",
      "finished_at": "finishedAt",
    });
  }),
);

export function searchFromJSON(
  jsonString: string,
): SafeParseResult<Search, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Search$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Search' from JSON`,
  );
}
