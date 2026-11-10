import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { MediaType, MediaType$inboundSchema } from "./media-type.js";

/**
 * One image or video a collector read, with the post that carried it.
 */
export type ScreeningMedia = {
  id: string;
  kind: "media";
  postId?: string | undefined;
  mediaType: MediaType;
  /**
   * Where the platform serves the image or video.
   */
  mediaUrl: string;
  /**
   * The caption or alt text.
   */
  text?: string | undefined;
  profileId: string;
  permalink: string;
  postedAt: string;
  /**
   * SHA-256 of the screenshot taken of a flagged item.
   */
  screenshotSha256?: string | undefined;
  /**
   * When the screenshot was taken.
   */
  capturedAt?: string | undefined;
};

/** @internal */
export const ScreeningMedia$inboundSchema: z.ZodMiniType<
  ScreeningMedia,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    kind: types.literal("media"),
    post_id: types.optional(types.string()),
    media_type: MediaType$inboundSchema,
    media_url: types.string(),
    text: types.optional(types.string()),
    profile_id: types.string(),
    permalink: types.string(),
    posted_at: types.string(),
    screenshot_sha256: types.optional(types.string()),
    captured_at: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "post_id": "postId",
      "media_type": "mediaType",
      "media_url": "mediaUrl",
      "profile_id": "profileId",
      "posted_at": "postedAt",
      "screenshot_sha256": "screenshotSha256",
      "captured_at": "capturedAt",
    });
  }),
);

export function screeningMediaFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningMedia, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningMedia$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningMedia' from JSON`,
  );
}
