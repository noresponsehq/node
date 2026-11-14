import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Access, Access$inboundSchema } from "./access.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  HandlePlatform,
  HandlePlatform$inboundSchema,
} from "./handle-platform.js";
import {
  ScreeningMatch,
  ScreeningMatch$inboundSchema,
} from "./screening-match.js";

/**
 * An account the screening matched to the person, how it was matched, and how much of it was read.
 */
export type ScreeningProfile = {
  id: string;
  /**
   * A platform a screening can cover. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.
   */
  platform: HandlePlatform;
  handle: string;
  url: string;
  displayName?: string | undefined;
  bio?: string | undefined;
  avatarUrl?: string | undefined;
  followers?: number | undefined;
  accountCreatedAt?: string | undefined;
  /**
   * public profiles were read; a private or locked one exists but could not be read.
   */
  access: Access;
  /**
   * How a profile was matched to the person: the state its evidence earns, and the evidence.
   */
  match: ScreeningMatch;
  /**
   * The resolver, collector or analyser that produced a record, by its catalogue name.
   */
  collector: string;
  itemsRead: number;
  /**
   * The oldest item read.
   */
  periodFrom?: string | undefined;
  /**
   * The newest item read.
   */
  periodTo?: string | undefined;
  collectedAt: string;
};

/** @internal */
export const ScreeningProfile$inboundSchema: z.ZodMiniType<
  ScreeningProfile,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    platform: HandlePlatform$inboundSchema,
    handle: types.string(),
    url: types.string(),
    display_name: types.optional(types.string()),
    bio: types.optional(types.string()),
    avatar_url: types.optional(types.string()),
    followers: types.optional(types.number()),
    account_created_at: types.optional(types.string()),
    access: Access$inboundSchema,
    match: ScreeningMatch$inboundSchema,
    collector: types.string(),
    items_read: types.number(),
    period_from: types.optional(types.string()),
    period_to: types.optional(types.string()),
    collected_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "display_name": "displayName",
      "avatar_url": "avatarUrl",
      "account_created_at": "accountCreatedAt",
      "items_read": "itemsRead",
      "period_from": "periodFrom",
      "period_to": "periodTo",
      "collected_at": "collectedAt",
    });
  }),
);

export function screeningProfileFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningProfile, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningProfile$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningProfile' from JSON`,
  );
}
