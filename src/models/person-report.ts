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
   * Where else in the environment the person appears, read live from those groups: deleting one removes it here.
   */
  otherGroups: OtherGroups;
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
      other_groups: OtherGroups$inboundSchema,
    }),
    z.transform((v) => {
      return remap$(v, {
        "other_groups": "otherGroups",
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
