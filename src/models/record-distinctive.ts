import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Rating, Rating$inboundSchema } from "./rating.js";

/**
 * How distinctive a searchable value is: an email, phone, username, password, hash, person name or IP. Absent for other values, for a field with no value, and when its rating could not be worked out, such as when a count failed.
 */
export type RecordDistinctive = {
  /**
   * unique: an email or phone, which belongs to one person by design. distinctive: rare enough that a new search on it likely finds one person. common: shared by many people, so a search on it finds strangers. A new search is suggested for unique and distinctive values only; any value can still be searched.
   */
  rating: Rating;
  /**
   * Why, in plain words, such as "seen 3,861,493 times in breach data", "in 4 breach rows" or "38 bits, about one in 430 billion usernames".
   */
  reason: string;
};

/** @internal */
export const RecordDistinctive$inboundSchema: z.ZodMiniType<
  RecordDistinctive,
  unknown
> = z.object({
  rating: Rating$inboundSchema,
  reason: types.string(),
});

export function recordDistinctiveFromJSON(
  jsonString: string,
): SafeParseResult<RecordDistinctive, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordDistinctive$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordDistinctive' from JSON`,
  );
}
