import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Current resolution of each resolved retained review; prior resolutions and reopened reviews do not count. Missing keys mean zero. These investigation conclusions are independent of account feedback.
 */
export type ReviewsConclusions = {
  benign?: number | undefined;
  abuse?: number | undefined;
  inconclusive?: number | undefined;
};

/** @internal */
export const ReviewsConclusions$inboundSchema: z.ZodMiniType<
  ReviewsConclusions,
  unknown
> = z.object({
  benign: types.optional(types.number()),
  abuse: types.optional(types.number()),
  inconclusive: types.optional(types.number()),
});

export function reviewsConclusionsFromJSON(
  jsonString: string,
): SafeParseResult<ReviewsConclusions, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewsConclusions$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewsConclusions' from JSON`,
  );
}
