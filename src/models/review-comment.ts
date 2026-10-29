import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type ReviewComment = {
  id: string;
  reviewVersion: number;
  body: string;
  createdBy: string;
  createdAt: string;
};

/** @internal */
export const ReviewComment$inboundSchema: z.ZodMiniType<
  ReviewComment,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    review_version: types.number(),
    body: types.string(),
    created_by: types.string(),
    created_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "review_version": "reviewVersion",
      "created_by": "createdBy",
      "created_at": "createdAt",
    });
  }),
);

export function reviewCommentFromJSON(
  jsonString: string,
): SafeParseResult<ReviewComment, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewComment$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewComment' from JSON`,
  );
}
