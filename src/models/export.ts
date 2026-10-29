import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Resolution, Resolution$inboundSchema } from "./resolution.js";
import {
  ReviewComment,
  ReviewComment$inboundSchema,
} from "./review-comment.js";
import {
  ReviewSubject,
  ReviewSubject$inboundSchema,
} from "./review-subject.js";
import { Review, Review$inboundSchema } from "./review.js";

/**
 * Retained review snapshot.
 */
export type Export = {
  exportedAt: string;
  review: Review;
  comments: Array<ReviewComment>;
  resolutions: Array<Resolution>;
  subjects: Array<ReviewSubject>;
};

/** @internal */
export const Export$inboundSchema: z.ZodMiniType<Export, unknown> = z.pipe(
  z.object({
    exported_at: types.string(),
    review: Review$inboundSchema,
    comments: z.array(ReviewComment$inboundSchema),
    resolutions: z.array(Resolution$inboundSchema),
    subjects: z.array(ReviewSubject$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "exported_at": "exportedAt",
    });
  }),
);

export function exportFromJSON(
  jsonString: string,
): SafeParseResult<Export, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Export$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Export' from JSON`,
  );
}
