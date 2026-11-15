import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * A platform a screening can cover. github and scratch through flickr are each one read of the public profile a handle names, with no posts; chesscom also reads the profile's stats, clubs and last two months of games, for its activity and contacts. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.
 */
export const HandlePlatform = {
  Instagram: "instagram",
  X: "x",
  Bluesky: "bluesky",
  Youtube: "youtube",
  Tiktok: "tiktok",
  Facebook: "facebook",
  Threads: "threads",
  Reddit: "reddit",
  Telegram: "telegram",
  Linkedin: "linkedin",
  Github: "github",
  Scratch: "scratch",
  Dailymotion: "dailymotion",
  Substack: "substack",
  Duolingo: "duolingo",
  Dockerhub: "dockerhub",
  Wikipedia: "wikipedia",
  Internetarchive: "internetarchive",
  Spotify: "spotify",
  Patreon: "patreon",
  Wordpress: "wordpress",
  Okru: "okru",
  Flickr: "flickr",
  Chesscom: "chesscom",
  Synthetic: "synthetic",
} as const;
/**
 * A platform a screening can cover. github and scratch through flickr are each one read of the public profile a handle names, with no posts; chesscom also reads the profile's stats, clubs and last two months of games, for its activity and contacts. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.
 */
export type HandlePlatform = OpenEnum<typeof HandlePlatform>;

/** @internal */
export const HandlePlatform$inboundSchema: z.ZodMiniType<
  HandlePlatform,
  unknown
> = openEnums.inboundSchema(HandlePlatform);
/** @internal */
export const HandlePlatform$outboundSchema: z.ZodMiniType<
  string,
  HandlePlatform
> = openEnums.outboundSchema(HandlePlatform);
