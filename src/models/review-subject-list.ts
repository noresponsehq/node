import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ReviewSubject,
  ReviewSubject$inboundSchema,
} from "./review-subject.js";

/**
 * Retained tenant-local subject links and the current review version.
 */
export type ReviewSubjectList = {
  reviewVersion: number;
  items: Array<ReviewSubject>;
};

/** @internal */
export const ReviewSubjectList$inboundSchema: z.ZodMiniType<
  ReviewSubjectList,
  unknown
> = z.pipe(
  z.object({
    review_version: types.number(),
    items: z.array(ReviewSubject$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "review_version": "reviewVersion",
    });
  }),
);

export function reviewSubjectListFromJSON(
  jsonString: string,
): SafeParseResult<ReviewSubjectList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewSubjectList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewSubjectList' from JSON`,
  );
}
