import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { ReviewView, ReviewView$inboundSchema } from "./review-view.js";

/**
 * List your private and shared review filters.
 */
export type ReviewViewList = {
  items: Array<ReviewView>;
};

/** @internal */
export const ReviewViewList$inboundSchema: z.ZodMiniType<
  ReviewViewList,
  unknown
> = z.object({
  items: z.array(ReviewView$inboundSchema),
});

export function reviewViewListFromJSON(
  jsonString: string,
): SafeParseResult<ReviewViewList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewViewList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewViewList' from JSON`,
  );
}
