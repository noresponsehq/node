import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Coverage, Coverage$inboundSchema } from "./coverage.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ReviewsConclusions,
  ReviewsConclusions$inboundSchema,
} from "./reviews-conclusions.js";

/**
 * Reviews created in [from,to) whose review and current account assessment remain retained. Status and assignment are current at as_of, not a transition history. label_coverage numerator is resolved reviews labeled benign or abuse; denominator is resolved reviews. Inconclusive is not a known outcome. Review conclusions do not change account feedback or enforcement.
 */
export type Reviews = {
  population: "retained_reviews_by_created_at";
  denominator: number;
  open: number;
  inProgress: number;
  resolved: number;
  assigned: number;
  unassigned: number;
  /**
   * Counts only; a zero denominator means no eligible retained records and does not imply a zero rate.
   */
  labelCoverage: Coverage;
  /**
   * Current resolution of each resolved retained review; prior resolutions and reopened reviews do not count. Missing keys mean zero. These investigation conclusions are independent of account feedback.
   */
  conclusions: ReviewsConclusions;
};

/** @internal */
export const Reviews$inboundSchema: z.ZodMiniType<Reviews, unknown> = z.pipe(
  z.object({
    population: types.literal("retained_reviews_by_created_at"),
    denominator: types.number(),
    open: types.number(),
    in_progress: types.number(),
    resolved: types.number(),
    assigned: types.number(),
    unassigned: types.number(),
    label_coverage: Coverage$inboundSchema,
    conclusions: ReviewsConclusions$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "in_progress": "inProgress",
      "label_coverage": "labelCoverage",
    });
  }),
);

export function reviewsFromJSON(
  jsonString: string,
): SafeParseResult<Reviews, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Reviews$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Reviews' from JSON`,
  );
}
