import * as z from "zod/v4-mini";
import {
  ScreeningDepth,
  ScreeningDepth$outboundSchema,
} from "./screening-depth.js";

/**
 * Screens the group's people no screening has reached.
 */
export type ScreeningRequest = {
  depth: ScreeningDepth;
};

/** @internal */
export type ScreeningRequest$Outbound = {
  depth: string;
};

/** @internal */
export const ScreeningRequest$outboundSchema: z.ZodMiniType<
  ScreeningRequest$Outbound,
  ScreeningRequest
> = z.object({
  depth: ScreeningDepth$outboundSchema,
});

export function screeningRequestToJSON(
  screeningRequest: ScreeningRequest,
): string {
  return JSON.stringify(
    ScreeningRequest$outboundSchema.parse(screeningRequest),
  );
}
