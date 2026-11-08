import * as z from "zod/v4-mini";

/**
 * An empty object.
 */
export type ScreeningCancelRequest = {};

/** @internal */
export type ScreeningCancelRequest$Outbound = {};

/** @internal */
export const ScreeningCancelRequest$outboundSchema: z.ZodMiniType<
  ScreeningCancelRequest$Outbound,
  ScreeningCancelRequest
> = z.object({});

export function screeningCancelRequestToJSON(
  screeningCancelRequest: ScreeningCancelRequest,
): string {
  return JSON.stringify(
    ScreeningCancelRequest$outboundSchema.parse(screeningCancelRequest),
  );
}
