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
 * The link and resulting review version.
 */
export type ReviewSubjectChange = {
  reviewVersion: number;
  /**
   * A tenant-local investigation link. risk_version is the account risk version captured when the link was added. It does not assert a relationship or change feedback or enforcement.
   */
  subject: ReviewSubject;
};

/** @internal */
export const ReviewSubjectChange$inboundSchema: z.ZodMiniType<
  ReviewSubjectChange,
  unknown
> = z.pipe(
  z.object({
    review_version: types.number(),
    subject: ReviewSubject$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "review_version": "reviewVersion",
    });
  }),
);

export function reviewSubjectChangeFromJSON(
  jsonString: string,
): SafeParseResult<ReviewSubjectChange, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewSubjectChange$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewSubjectChange' from JSON`,
  );
}
