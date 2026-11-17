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
  /**
   * The platforms to search. Leave it out for a full search: every platform a connector serves in the environment when the screening starts, which the screening then lists.
   */
  platforms?: Array<string> | undefined;
};

/** @internal */
export type ScreeningRequest$Outbound = {
  depth: string;
  platforms?: Array<string> | undefined;
};

/** @internal */
export const ScreeningRequest$outboundSchema: z.ZodMiniType<
  ScreeningRequest$Outbound,
  ScreeningRequest
> = z.object({
  depth: ScreeningDepth$outboundSchema,
  platforms: z.optional(z.array(z.string())),
});

export function screeningRequestToJSON(
  screeningRequest: ScreeningRequest,
): string {
  return JSON.stringify(
    ScreeningRequest$outboundSchema.parse(screeningRequest),
  );
}
