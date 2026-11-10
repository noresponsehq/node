import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { FindingBand, FindingBand$inboundSchema } from "./finding-band.js";
import {
  FindingCategory,
  FindingCategory$inboundSchema,
} from "./finding-category.js";
import {
  ScreeningMediaObservation,
  ScreeningMediaObservation$inboundSchema,
} from "./screening-media-observation.js";

/**
 * Something the analyser flagged. band is capped by the strongest match among the profiles of its evidence: possible at most moderate, probable at most high. capped_from is the band the analyser gave when the cap lowered it.
 */
export type ScreeningFinding = {
  id: string;
  /**
   * What a finding is about: a direct threat to the principal or the event, intent to harm without a named target, fixation on the principal, a grievance against the host, research into the venue, route or security, weapons tied to any of these, disruption or protest planning toward this event, violent extremist content or identification, prior harassment or stalking of staff or principals, or posting the principal's addresses or movements.
   */
  category: FindingCategory;
  /**
   * How severe a finding is, most severe first.
   */
  band: FindingBand;
  /**
   * How severe a finding is, most severe first.
   */
  cappedFrom?: FindingBand | undefined;
  confidence: number;
  rationale: string;
  /**
   * The exact words of the first evidence item that the finding rests on, as the analyser quoted them.
   */
  quote?: string | undefined;
  /**
   * The posts and media that support the finding.
   */
  evidence: Array<string>;
  /**
   * What the analyser saw in each image among evidence that the finding rests on. Unlike quote, an observation cannot be checked against the record: judge it against the image at the media item's permalink.
   */
  mediaObservations?: Array<ScreeningMediaObservation> | undefined;
  /**
   * The resolver, collector or analyser that produced a record, by its catalogue name.
   */
  analyser: string;
  model: string;
  /**
   * What the analysis cost, in US cents.
   */
  spendMinor: number;
  createdAt: string;
};

/** @internal */
export const ScreeningFinding$inboundSchema: z.ZodMiniType<
  ScreeningFinding,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    category: FindingCategory$inboundSchema,
    band: FindingBand$inboundSchema,
    capped_from: types.optional(FindingBand$inboundSchema),
    confidence: types.number(),
    rationale: types.string(),
    quote: types.optional(types.string()),
    evidence: z.array(types.string()),
    media_observations: types.optional(
      z.array(ScreeningMediaObservation$inboundSchema),
    ),
    analyser: types.string(),
    model: types.string(),
    spend_minor: types.number(),
    created_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "capped_from": "cappedFrom",
      "media_observations": "mediaObservations",
      "spend_minor": "spendMinor",
      "created_at": "createdAt",
    });
  }),
);

export function screeningFindingFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningFinding, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningFinding$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningFinding' from JSON`,
  );
}
