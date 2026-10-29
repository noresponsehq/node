import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The live environment's daily cap on assessments members make through the console (the playground), as spent on the current UTC day. Each console submission with a new Idempotency-Key spends one lookup; a replay spends nothing, and API keys and the test environment spend none. When used reaches limit, the next lookup answers 429 lookup_limit_reached until resets_at. The count is the one the cap enforces.
 */
export type ConsoleLookups = {
  /**
   * Lookups spent since the last reset.
   */
  used: number;
  /**
   * Lookups allowed per UTC day.
   */
  limit: number;
  /**
   * The next reset: the coming midnight UTC, when used returns to 0.
   */
  resetsAt: string;
};

/** @internal */
export const ConsoleLookups$inboundSchema: z.ZodMiniType<
  ConsoleLookups,
  unknown
> = z.pipe(
  z.object({
    used: types.number(),
    limit: types.number(),
    resets_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "resets_at": "resetsAt",
    });
  }),
);

export function consoleLookupsFromJSON(
  jsonString: string,
): SafeParseResult<ConsoleLookups, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ConsoleLookups$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ConsoleLookups' from JSON`,
  );
}
