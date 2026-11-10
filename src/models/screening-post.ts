import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * One post a collector read, with its permalink and time.
 */
export type ScreeningPost = {
  id: string;
  kind: "post";
  text: string;
  replyTo?: string | undefined;
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
export const ScreeningPost$inboundSchema: z.ZodMiniType<
  ScreeningPost,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    kind: types.literal("post"),
    text: types.string(),
    reply_to: types.optional(types.string()),
    profile_id: types.string(),
    permalink: types.string(),
    posted_at: types.string(),
    screenshot_sha256: types.optional(types.string()),
    captured_at: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "reply_to": "replyTo",
      "profile_id": "profileId",
      "posted_at": "postedAt",
      "screenshot_sha256": "screenshotSha256",
      "captured_at": "capturedAt",
    });
  }),
);

export function screeningPostFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningPost, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningPost$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningPost' from JSON`,
  );
}
