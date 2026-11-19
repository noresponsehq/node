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
import {
  SuggestedSearch,
  SuggestedSearch$inboundSchema,
} from "./suggested-search.js";

/**
 * Everything known about one person, and where else in the environment they appear.
 */
export type PersonReport = {
  /**
   * A person and where their screening and review stand.
   */
  person: Person;
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
   * The searches on this person's values in this group, newest first: each names the value, the record and field it came from, and the search that found that record. Absent when nothing was searched.
   */
  searches?: Array<Search> | undefined;
  /**
   * The searches enrichment would start on this person in this group, likeliest record first. Group screening follows the environment's enrichment setting, with suggest as its mode while the workspace has not set one. In off mode the list is empty. In suggest mode enrichment starts none of them by itself; in automatic mode it starts them as its limits allow. Empty when evidence.read is denied.
   */
  suggestedSearches: Array<SuggestedSearch>;
  /**
   * Where else in the environment the person appears, read live from those groups: deleting one removes it here.
   */
  otherGroups: OtherGroups;
  /**
   * True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, posts, media, discovered values and free-text decision notes are withheld.
   */
  evidenceRestricted?: boolean | undefined;
};

/** @internal */
export const PersonReport$inboundSchema: z.ZodMiniType<PersonReport, unknown> =
  z.pipe(
    z.object({
      person: Person$inboundSchema,
      profiles: z.array(ScreeningProfile$inboundSchema),
      posts: z.array(ScreeningPost$inboundSchema),
      media: z.array(ScreeningMedia$inboundSchema),
      reviews: z.array(PersonReview$inboundSchema),
      lookup: types.optional(ScreeningLookup$inboundSchema),
      searches: types.optional(z.array(Search$inboundSchema)),
      suggested_searches: z.array(SuggestedSearch$inboundSchema),
      other_groups: OtherGroups$inboundSchema,
      evidence_restricted: types.optional(types.boolean()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "suggested_searches": "suggestedSearches",
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
