import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Review, Review$inboundSchema } from "./review.js";

/**
 * List retained account reviews.
 */
export type ReviewList = {
  items: Array<Review>;
  nextCursor?: string | undefined;
};

/** @internal */
export const ReviewList$inboundSchema: z.ZodMiniType<ReviewList, unknown> = z
  .pipe(
    z.object({
      items: z.array(Review$inboundSchema),
      next_cursor: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "next_cursor": "nextCursor",
      });
    }),
  );

export function reviewListFromJSON(
  jsonString: string,
): SafeParseResult<ReviewList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewList' from JSON`,
  );
}
