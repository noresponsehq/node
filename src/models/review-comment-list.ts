import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ReviewComment,
  ReviewComment$inboundSchema,
} from "./review-comment.js";

/**
 * Read retained review comments.
 */
export type ReviewCommentList = {
  items: Array<ReviewComment>;
  nextCursor?: string | undefined;
};

/** @internal */
export const ReviewCommentList$inboundSchema: z.ZodMiniType<
  ReviewCommentList,
  unknown
> = z.pipe(
  z.object({
    items: z.array(ReviewComment$inboundSchema),
    next_cursor: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "next_cursor": "nextCursor",
    });
  }),
);

export function reviewCommentListFromJSON(
  jsonString: string,
): SafeParseResult<ReviewCommentList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewCommentList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewCommentList' from JSON`,
  );
}
