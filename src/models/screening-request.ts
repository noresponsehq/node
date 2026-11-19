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
  /**
   * Deprecated: leave it out. Without it the screening is a full search: every platform a connector serves in the environment when the screening starts, which the screening then lists, each searched only with the identifiers its connector takes. A list sent here still limits the screening until a later contract release removes the field.
   *
   * @deprecated field: This will be removed in a future release, please migrate away from it as soon as possible.
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
