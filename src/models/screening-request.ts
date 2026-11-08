import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";
import {
  ScreeningDepth,
  ScreeningDepth$outboundSchema,
} from "./screening-depth.js";

export const ScreeningRequestPlatform = {
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
} as const;
export type ScreeningRequestPlatform = ClosedEnum<
  typeof ScreeningRequestPlatform
>;

/**
 * Screens the event's attendees no screening has reached and everyone on watch or escalated.
 */
export type ScreeningRequest = {
  depth: ScreeningDepth;
  platforms: Array<ScreeningRequestPlatform>;
};

/** @internal */
export const ScreeningRequestPlatform$outboundSchema: z.ZodMiniEnum<
  typeof ScreeningRequestPlatform
> = z.enum(ScreeningRequestPlatform);

/** @internal */
export type ScreeningRequest$Outbound = {
  depth: string;
  platforms: Array<string>;
};

/** @internal */
export const ScreeningRequest$outboundSchema: z.ZodMiniType<
  ScreeningRequest$Outbound,
  ScreeningRequest
> = z.object({
  depth: ScreeningDepth$outboundSchema,
  platforms: z.array(ScreeningRequestPlatform$outboundSchema),
});

export function screeningRequestToJSON(
  screeningRequest: ScreeningRequest,
): string {
  return JSON.stringify(
    ScreeningRequest$outboundSchema.parse(screeningRequest),
  );
}
