import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningNotAnalysedReason,
  ScreeningNotAnalysedReason$inboundSchema,
} from "./screening-not-analysed-reason.js";

/**
 * How many items read were not analysed for one reason.
 */
export type ScreeningNotAnalysedCount = {
  /**
   * Why an item read was not analysed. video: a video, whose caption alone is read. image_unavailable: the image could not be fetched from the platform. image_unsupported: not a JPEG, PNG, GIF or WebP image, or too large to send. image_limit: past the most images one person's analysis reads. refused: the model declined to read it. unfinished: the model cut its batch short or answered outside the schema, or the request was rejected. unverified: a finding cited it with words it does not contain or an image it did not describe. unspecified: the analyser gave no reason.
   */
  reason: ScreeningNotAnalysedReason;
  items: number;
};

/** @internal */
export const ScreeningNotAnalysedCount$inboundSchema: z.ZodMiniType<
  ScreeningNotAnalysedCount,
  unknown
> = z.object({
  reason: ScreeningNotAnalysedReason$inboundSchema,
  items: types.number(),
});

export function screeningNotAnalysedCountFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningNotAnalysedCount, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningNotAnalysedCount$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningNotAnalysedCount' from JSON`,
  );
}
