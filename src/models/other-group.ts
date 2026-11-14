import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { HighestBand, HighestBand$inboundSchema } from "./highest-band.js";
import { MatchState, MatchState$inboundSchema } from "./match-state.js";
import {
  PersonDecision,
  PersonDecision$inboundSchema,
} from "./person-decision.js";

export const MatchedOn = {
  Email: "email",
  Phone: "phone",
  ExternalId: "external_id",
} as const;
export type MatchedOn = OpenEnum<typeof MatchedOn>;

/**
 * A person of another group in the same environment who shares an email or phone with this one, as that group recorded them.
 */
export type OtherGroup = {
  groupId: string;
  groupName: string;
  groupStartsAt: string;
  /**
   * The person on that group's list.
   */
  personId: string;
  /**
   * Which identifiers match, in this order. external_id appears only beside email or phone: the same external id alone is not a match, since ticket numbers may be reused across groups.
   */
  matchedOn: Array<MatchedOn>;
  /**
   * How sure the latest screening is that it found the person's accounts. unscreened until a screening reaches the person, and after one that had no profile to check (no_profile_to_check).
   */
  matchState: MatchState;
  /**
   * true when that person's latest screening had no profile to check (see the person's no_profile_to_check). Left out otherwise.
   */
  noProfileToCheck?: boolean | undefined;
  /**
   * That person's most severe band in that group, or null.
   */
  highestBand: HighestBand | null;
  /**
   * The latest reviewer decision in that group, or null before any.
   */
  decision: PersonDecision | null;
  /**
   * Who made that decision.
   */
  decidedBy?: string | undefined;
  /**
   * When that decision was made.
   */
  decidedAt?: string | undefined;
};

/** @internal */
export const MatchedOn$inboundSchema: z.ZodMiniType<MatchedOn, unknown> =
  openEnums.inboundSchema(MatchedOn);

/** @internal */
export const OtherGroup$inboundSchema: z.ZodMiniType<OtherGroup, unknown> = z
  .pipe(
    z.object({
      group_id: types.string(),
      group_name: types.string(),
      group_starts_at: types.string(),
      person_id: types.string(),
      matched_on: z.array(MatchedOn$inboundSchema),
      match_state: MatchState$inboundSchema,
      no_profile_to_check: types.optional(types.boolean()),
      highest_band: types.nullable(HighestBand$inboundSchema),
      decision: types.nullable(PersonDecision$inboundSchema),
      decided_by: types.optional(types.string()),
      decided_at: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "group_id": "groupId",
        "group_name": "groupName",
        "group_starts_at": "groupStartsAt",
        "person_id": "personId",
        "matched_on": "matchedOn",
        "match_state": "matchState",
        "no_profile_to_check": "noProfileToCheck",
        "highest_band": "highestBand",
        "decided_by": "decidedBy",
        "decided_at": "decidedAt",
      });
    }),
  );

export function otherGroupFromJSON(
  jsonString: string,
): SafeParseResult<OtherGroup, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => OtherGroup$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'OtherGroup' from JSON`,
  );
}
