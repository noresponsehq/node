import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Rating, Rating$inboundSchema } from "./rating.js";

/**
 * How distinctive a searchable value is: an email, phone, username, password, hash, person name or IP. Absent for other values, for a field with no value, and when its rating could not be worked out, such as when a count failed. Linkage weighs a password, hash or username by these numbers: the rarer the value, the more a shared one counts.
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
  /**
   * How many breach rows hold the value, when they were counted. Set for a username, password, hash or person name.
   */
  rows?: number | undefined;
  /**
   * How many times the Pwned Passwords list holds the password, when it was asked. Set for a password only.
   */
  pwned?: number | undefined;
  /**
   * How surprising the username is, to one decimal place: a character model spells it about once in 2^bits usernames. Set for a username the model can spell.
   */
  bits?: number | undefined;
};

/** @internal */
export const RecordDistinctive$inboundSchema: z.ZodMiniType<
  RecordDistinctive,
  unknown
> = z.object({
  rating: Rating$inboundSchema,
  reason: types.string(),
  rows: types.optional(types.number()),
  pwned: types.optional(types.number()),
  bits: types.optional(types.number()),
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
