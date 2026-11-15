import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { OtherGroups, OtherGroups$inboundSchema } from "./other-groups.js";
import { PersonReview, PersonReview$inboundSchema } from "./person-review.js";
import { Person, Person$inboundSchema } from "./person.js";
import {
  ScreeningFinding,
  ScreeningFinding$inboundSchema,
} from "./screening-finding.js";
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
import { Search, Search$inboundSchema } from "./search.js";

/**
 * Everything known about one person, and where else in the environment they appear.
 */
export type PersonReport = {
  /**
   * A person and where their screening and review stand.
   */
  person: Person;
  /**
   * The accounts the latest screening matched, with how each was matched.
   */
  profiles: Array<ScreeningProfile>;
  /**
   * What the latest screening flagged, most severe first, each citing its evidence.
   */
  findings: Array<ScreeningFinding>;
  /**
   * The posts the findings cite.
   */
  posts: Array<ScreeningPost>;
  /**
   * The images and videos the findings cite.
   */
  media: Array<ScreeningMedia>;
  /**
   * Every recorded decision, oldest first.
   */
  reviews: Array<PersonReview>;
  /**
   * What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.
   */
  lookup?: ScreeningLookup | undefined;
  /**
   * The searches people started on this person's values, newest first: each names the value, and the record and field it came from. Absent when nobody searched.
   */
  searches?: Array<Search> | undefined;
  /**
   * Where else in the environment the person appears, read live from those groups: deleting one removes it here.
   */
  otherGroups: OtherGroups;
  /**
   * True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, findings, posts, media, discovered values and free-text decision notes are withheld.
   */
  evidenceRestricted?: boolean | undefined;
};

/** @internal */
export const PersonReport$inboundSchema: z.ZodMiniType<PersonReport, unknown> =
  z.pipe(
    z.object({
      person: Person$inboundSchema,
      profiles: z.array(ScreeningProfile$inboundSchema),
      findings: z.array(ScreeningFinding$inboundSchema),
      posts: z.array(ScreeningPost$inboundSchema),
      media: z.array(ScreeningMedia$inboundSchema),
      reviews: z.array(PersonReview$inboundSchema),
      lookup: types.optional(ScreeningLookup$inboundSchema),
      searches: types.optional(z.array(Search$inboundSchema)),
      other_groups: OtherGroups$inboundSchema,
      evidence_restricted: types.optional(types.boolean()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "other_groups": "otherGroups",
        "evidence_restricted": "evidenceRestricted",
      });
    }),
  );

export function personReportFromJSON(
  jsonString: string,
): SafeParseResult<PersonReport, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonReport$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonReport' from JSON`,
  );
}
