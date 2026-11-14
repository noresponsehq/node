import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  HighestBand,
  HighestBand$inboundSchema,
  HighestBand$outboundSchema,
} from "./highest-band.js";
import {
  PersonFlaggedMatchState,
  PersonFlaggedMatchState$inboundSchema,
  PersonFlaggedMatchState$outboundSchema,
} from "./person-flagged-match-state.js";

/**
 * A screening recorded a finding on a person. It says which person and how severe, not what they posted, who they are or why: GET the person report for the findings. Sent once per screening that flags the person, so a re-screen of someone on watch announces them again.
 */
export type PersonFlagged = {
  /**
   * The person's group.
   */
  groupId: string;
  /**
   * The flagged person.
   */
  personId: string;
  /**
   * The screening that flagged them.
   */
  screeningId: string;
  highestBand: HighestBand;
  /**
   * How sure the screening is that the accounts it read are the person's. A finding on a possible match is at most moderate, on a probable match at most high.
   */
  matchState: PersonFlaggedMatchState;
  /**
   * When the screening recorded the finding; equal to the event's created_at.
   */
  flaggedAt: string;
};

/** @internal */
export const PersonFlagged$inboundSchema: z.ZodMiniType<
  PersonFlagged,
  unknown
> = z.pipe(
  z.object({
    group_id: types.string(),
    person_id: types.string(),
    screening_id: types.string(),
    highest_band: HighestBand$inboundSchema,
    match_state: PersonFlaggedMatchState$inboundSchema,
    flagged_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "group_id": "groupId",
      "person_id": "personId",
      "screening_id": "screeningId",
      "highest_band": "highestBand",
      "match_state": "matchState",
      "flagged_at": "flaggedAt",
    });
  }),
);
/** @internal */
export type PersonFlagged$Outbound = {
  group_id: string;
  person_id: string;
  screening_id: string;
  highest_band: string;
  match_state: string;
  flagged_at: string;
};

/** @internal */
export const PersonFlagged$outboundSchema: z.ZodMiniType<
  PersonFlagged$Outbound,
  PersonFlagged
> = z.pipe(
  z.object({
    groupId: z.string(),
    personId: z.string(),
    screeningId: z.string(),
    highestBand: HighestBand$outboundSchema,
    matchState: PersonFlaggedMatchState$outboundSchema,
    flaggedAt: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      groupId: "group_id",
      personId: "person_id",
      screeningId: "screening_id",
      highestBand: "highest_band",
      matchState: "match_state",
      flaggedAt: "flagged_at",
    });
  }),
);

export function personFlaggedToJSON(personFlagged: PersonFlagged): string {
  return JSON.stringify(PersonFlagged$outboundSchema.parse(personFlagged));
}
export function personFlaggedFromJSON(
  jsonString: string,
): SafeParseResult<PersonFlagged, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonFlagged$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonFlagged' from JSON`,
  );
}
