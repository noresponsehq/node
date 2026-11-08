import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Screened attendees by the band of their most severe finding.
 */
export type ScreeningCompletedByBand = {
  critical: number;
  high: number;
  moderate: number;
  low: number;
  info: number;
};

/** @internal */
export const ScreeningCompletedByBand$inboundSchema: z.ZodMiniType<
  ScreeningCompletedByBand,
  unknown
> = z.object({
  critical: types.number(),
  high: types.number(),
  moderate: types.number(),
  low: types.number(),
  info: types.number(),
});
/** @internal */
export type ScreeningCompletedByBand$Outbound = {
  critical: number;
  high: number;
  moderate: number;
  low: number;
  info: number;
};

/** @internal */
export const ScreeningCompletedByBand$outboundSchema: z.ZodMiniType<
  ScreeningCompletedByBand$Outbound,
  ScreeningCompletedByBand
> = z.object({
  critical: z.int(),
  high: z.int(),
  moderate: z.int(),
  low: z.int(),
  info: z.int(),
});

export function screeningCompletedByBandToJSON(
  screeningCompletedByBand: ScreeningCompletedByBand,
): string {
  return JSON.stringify(
    ScreeningCompletedByBand$outboundSchema.parse(screeningCompletedByBand),
  );
}
export function screeningCompletedByBandFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningCompletedByBand, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningCompletedByBand$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningCompletedByBand' from JSON`,
  );
}
