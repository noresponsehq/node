import * as z from "zod/v4-mini";
import {
  ScreeningDepth,
  ScreeningDepth$outboundSchema,
} from "./screening-depth.js";

/**
 * Screens the group's people no screening has reached and everyone on watch or escalated.
 */
export type ScreeningRequest = {
  depth: ScreeningDepth;
  platforms: Array<string>;
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
  platforms: z.array(z.string()),
});

export function screeningRequestToJSON(
  screeningRequest: ScreeningRequest,
): string {
  return JSON.stringify(
    ScreeningRequest$outboundSchema.parse(screeningRequest),
  );
}
