import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Resolution, Resolution$inboundSchema } from "./resolution.js";

/**
 * Read immutable review resolution history.
 */
export type ReviewResolutionList = {
  items: Array<Resolution>;
  nextBeforeVersion?: number | undefined;
};

/** @internal */
export const ReviewResolutionList$inboundSchema: z.ZodMiniType<
  ReviewResolutionList,
  unknown
> = z.pipe(
  z.object({
    items: z.array(Resolution$inboundSchema),
    next_before_version: types.optional(types.number()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "next_before_version": "nextBeforeVersion",
    });
  }),
);

export function reviewResolutionListFromJSON(
  jsonString: string,
): SafeParseResult<ReviewResolutionList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewResolutionList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewResolutionList' from JSON`,
  );
}
