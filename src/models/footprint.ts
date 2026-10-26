import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  FootprintCoherence,
  FootprintCoherence$inboundSchema,
  FootprintCoherence$Outbound,
  FootprintCoherence$outboundSchema,
} from "./footprint-coherence.js";
import {
  FootprintFamily,
  FootprintFamily$inboundSchema,
  FootprintFamily$outboundSchema,
} from "./footprint-family.js";
import {
  FootprintTimeline,
  FootprintTimeline$inboundSchema,
  FootprintTimeline$Outbound,
  FootprintTimeline$outboundSchema,
} from "./footprint-timeline.js";

/**
 * How long and how widely the signup's email and username have existed, and how far independent sources agree on the person behind them, in years and counts only. families are the kinds of evidence that found either identifier. Omitted when nothing found them: a footprint lookup that failed makes no claim, and absence is no_digital_footprint's to state.
 */
export type Footprint = {
  /**
   * One identifier's dated footprint across every source: the first and last year any event was seen, the years between them, the latest year a source dated activity (omitted when none did), how many distinct sites and which kinds of evidence saw it.
   */
  email?: FootprintTimeline | undefined;
  /**
   * One identifier's dated footprint across every source: the first and last year any event was seen, the years between them, the latest year a source dated activity (omitted when none did), how many distinct sites and which kinds of evidence saw it.
   */
  username?: FootprintTimeline | undefined;
  families: Array<FootprintFamily>;
  coherence?: FootprintCoherence | undefined;
};

/** @internal */
export const Footprint$inboundSchema: z.ZodMiniType<Footprint, unknown> = z
  .object({
    email: types.optional(FootprintTimeline$inboundSchema),
    username: types.optional(FootprintTimeline$inboundSchema),
    families: z.array(FootprintFamily$inboundSchema),
    coherence: types.optional(FootprintCoherence$inboundSchema),
  });
/** @internal */
export type Footprint$Outbound = {
  email?: FootprintTimeline$Outbound | undefined;
  username?: FootprintTimeline$Outbound | undefined;
  families: Array<string>;
  coherence?: FootprintCoherence$Outbound | undefined;
};

/** @internal */
export const Footprint$outboundSchema: z.ZodMiniType<
  Footprint$Outbound,
  Footprint
> = z.object({
  email: z.optional(FootprintTimeline$outboundSchema),
  username: z.optional(FootprintTimeline$outboundSchema),
  families: z.array(FootprintFamily$outboundSchema),
  coherence: z.optional(FootprintCoherence$outboundSchema),
});

export function footprintToJSON(footprint: Footprint): string {
  return JSON.stringify(Footprint$outboundSchema.parse(footprint));
}
export function footprintFromJSON(
  jsonString: string,
): SafeParseResult<Footprint, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Footprint$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Footprint' from JSON`,
  );
}
