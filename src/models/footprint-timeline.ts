import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  FootprintFamily,
  FootprintFamily$inboundSchema,
  FootprintFamily$outboundSchema,
} from "./footprint-family.js";

/**
 * One identifier's dated footprint across every source: the first and last year any event was seen, the years between them, the latest year a source dated activity (omitted when none did), how many distinct sites and which kinds of evidence saw it.
 */
export type FootprintTimeline = {
  firstSeenYear: number;
  lastSeenYear: number;
  spanYears: number;
  lastActiveYear?: number | undefined;
  sites: number;
  families: Array<FootprintFamily>;
};

/** @internal */
export const FootprintTimeline$inboundSchema: z.ZodMiniType<
  FootprintTimeline,
  unknown
> = z.pipe(
  z.object({
    first_seen_year: types.number(),
    last_seen_year: types.number(),
    span_years: types.number(),
    last_active_year: types.optional(types.number()),
    sites: types.number(),
    families: z.array(FootprintFamily$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "first_seen_year": "firstSeenYear",
      "last_seen_year": "lastSeenYear",
      "span_years": "spanYears",
      "last_active_year": "lastActiveYear",
    });
  }),
);
/** @internal */
export type FootprintTimeline$Outbound = {
  first_seen_year: number;
  last_seen_year: number;
  span_years: number;
  last_active_year?: number | undefined;
  sites: number;
  families: Array<string>;
};

/** @internal */
export const FootprintTimeline$outboundSchema: z.ZodMiniType<
  FootprintTimeline$Outbound,
  FootprintTimeline
> = z.pipe(
  z.object({
    firstSeenYear: z.int(),
    lastSeenYear: z.int(),
    spanYears: z.int(),
    lastActiveYear: z.optional(z.int()),
    sites: z.int(),
    families: z.array(FootprintFamily$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      firstSeenYear: "first_seen_year",
      lastSeenYear: "last_seen_year",
      spanYears: "span_years",
      lastActiveYear: "last_active_year",
    });
  }),
);

export function footprintTimelineToJSON(
  footprintTimeline: FootprintTimeline,
): string {
  return JSON.stringify(
    FootprintTimeline$outboundSchema.parse(footprintTimeline),
  );
}
export function footprintTimelineFromJSON(
  jsonString: string,
): SafeParseResult<FootprintTimeline, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => FootprintTimeline$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'FootprintTimeline' from JSON`,
  );
}
