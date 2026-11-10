import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * What an analyser saw in one image that a finding rests on.
 */
export type ScreeningMediaObservation = {
  /**
   * The image, one of the finding's evidence.
   */
  mediaId: string;
  /**
   * What the analyser saw in the image that supports the finding.
   */
  description: string;
  /**
   * Words the analyser read in the image, as it read them. They come from the image's pixels, not from a post's text, so they are not a quote and were not checked against the record.
   */
  readText?: string | undefined;
};

/** @internal */
export const ScreeningMediaObservation$inboundSchema: z.ZodMiniType<
  ScreeningMediaObservation,
  unknown
> = z.pipe(
  z.object({
    media_id: types.string(),
    description: types.string(),
    read_text: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "media_id": "mediaId",
      "read_text": "readText",
    });
  }),
);

export function screeningMediaObservationFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningMediaObservation, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningMediaObservation$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningMediaObservation' from JSON`,
  );
}
