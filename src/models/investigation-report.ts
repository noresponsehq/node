import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Investigation, Investigation$inboundSchema } from "./investigation.js";
import { PersonReview, PersonReview$inboundSchema } from "./person-review.js";
import {
  ScreeningLookup,
  ScreeningLookup$inboundSchema,
} from "./screening-lookup.js";
import {
  ScreeningMedia,
  ScreeningMedia$inboundSchema,
} from "./screening-media.js";
import {
  ScreeningPost,
  ScreeningPost$inboundSchema,
} from "./screening-post.js";
import {
  ScreeningProfile,
  ScreeningProfile$inboundSchema,
} from "./screening-profile.js";
import {
  WorkspacePerson,
  WorkspacePerson$inboundSchema,
} from "./workspace-person.js";

/**
 * Read an investigation and its evidence.
 */
export type InvestigationReport = {
  /**
   * The accounts this result matched, with how each was matched.
   */
  profiles: Array<ScreeningProfile>;
  /**
   * All posts retained for this result.
   */
  posts: Array<ScreeningPost>;
  /**
   * All images and videos retained for this result.
   */
  media: Array<ScreeningMedia>;
  /**
   * Every recorded decision, oldest first.
   */
  reviews: Array<PersonReview>;
  /**
   * What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Nothing here sets a match state.
   */
  lookup?: ScreeningLookup | undefined;
  /**
   * True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, posts, media, discovered values and free-text decision notes are withheld.
   */
  evidenceRestricted?: boolean | undefined;
  person: WorkspacePerson;
  investigation: Investigation;
};

/** @internal */
export const InvestigationReport$inboundSchema: z.ZodMiniType<
  InvestigationReport,
  unknown
> = z.pipe(
  z.object({
    profiles: z.array(ScreeningProfile$inboundSchema),
    posts: z.array(ScreeningPost$inboundSchema),
    media: z.array(ScreeningMedia$inboundSchema),
    reviews: z.array(PersonReview$inboundSchema),
    lookup: types.optional(ScreeningLookup$inboundSchema),
    evidence_restricted: types.optional(types.boolean()),
    person: WorkspacePerson$inboundSchema,
    investigation: Investigation$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "evidence_restricted": "evidenceRestricted",
    });
  }),
);

export function investigationReportFromJSON(
  jsonString: string,
): SafeParseResult<InvestigationReport, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => InvestigationReport$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'InvestigationReport' from JSON`,
  );
}
