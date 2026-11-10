import * as z from "zod/v4-mini";
import {
  HandlePlatform,
  HandlePlatform$outboundSchema,
} from "./handle-platform.js";
import {
  ScreeningDepth,
  ScreeningDepth$outboundSchema,
} from "./screening-depth.js";

/**
 * Screens the event's attendees no screening has reached and everyone on watch or escalated.
 */
export type ScreeningRequest = {
  depth: ScreeningDepth;
  platforms: Array<HandlePlatform>;
};

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
  platforms: z.array(HandlePlatform$outboundSchema),
});

export function screeningRequestToJSON(
  screeningRequest: ScreeningRequest,
): string {
  return JSON.stringify(
    ScreeningRequest$outboundSchema.parse(screeningRequest),
  );
}
