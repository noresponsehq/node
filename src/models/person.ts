import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Handle, Handle$inboundSchema } from "./handle.js";
import { HighestBand, HighestBand$inboundSchema } from "./highest-band.js";
import { MatchState, MatchState$inboundSchema } from "./match-state.js";
import {
  PersonDecision,
  PersonDecision$inboundSchema,
} from "./person-decision.js";
import { PersonRole, PersonRole$inboundSchema } from "./person-role.js";
import {
  ScreeningCoverage,
  ScreeningCoverage$inboundSchema,
} from "./screening-coverage.js";
import {
  ScreeningSpend,
  ScreeningSpend$inboundSchema,
} from "./screening-spend.js";

/**
 * A person and where their screening and review stand.
 */
export type Person = {
  id: string;
  groupId: string;
  /**
   * Your own id for the person, unique within the group. A later row with the same external id updates this person.
   */
  externalId?: string | undefined;
  /**
   * The person's full name.
   */
  name: string;
  /**
   * The person's email.
   */
  email?: string | undefined;
  /**
   * The person's phone in E.164 form.
   */
  phone?: string | undefined;
  /**
   * Where the person works.
   */
  company?: string | undefined;
  /**
   * Where the person lives.
   */
  city?: string | undefined;
  /**
   * Accounts the person is known to hold, at most 20.
   */
  handles?: Array<Handle> | undefined;
  /**
   * The person's role in the group: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: a person without one has no role, not guest. A later row naming the same person replaces it, and a change of role alone keeps the person's screening results.
   */
  role?: PersonRole | undefined;
  /**
   * How sure the latest screening is that it found the person's accounts. unscreened until a screening reaches the person, and after one that had no profile to check (no_profile_to_check).
   */
  matchState: MatchState;
  /**
   * true when the latest screening reached the person but the list gave nothing to look up on any requested platform, such as no handle for a platform that reads supplied handles only: nobody looked for a profile. match_state stays unscreened, every platform is in coverage.not_searched, and the person is neither none_found nor failed and does not make the screening partial. Its lookups are on its report. Left out otherwise.
   */
  noProfileToCheck?: boolean | undefined;
  /**
   * The most severe finding's band, or null when nothing was flagged.
   */
  highestBand: HighestBand | null;
  /**
   * The latest reviewer decision, or null before any.
   */
  decision: PersonDecision | null;
  decisionNote?: string | undefined;
  decidedBy?: string | undefined;
  decidedAt?: string | undefined;
  /**
   * The denominator of a screening: accounts found, how many could be read, items read and the period they span, so a clean result is distinct from a person nobody could see.
   */
  coverage: ScreeningCoverage;
  lastScreeningId?: string | undefined;
  screenedAt?: string | undefined;
  createdAt: string;
  updatedAt: string;
  /**
   * What screening cost, in US cents, in total and per implementation.
   */
  spend: ScreeningSpend;
};

/** @internal */
export const Person$inboundSchema: z.ZodMiniType<Person, unknown> = z.pipe(
  z.object({
    id: types.string(),
    group_id: types.string(),
    external_id: types.optional(types.string()),
    name: types.string(),
    email: types.optional(types.string()),
    phone: types.optional(types.string()),
    company: types.optional(types.string()),
    city: types.optional(types.string()),
    handles: types.optional(z.array(Handle$inboundSchema)),
    role: types.optional(PersonRole$inboundSchema),
    match_state: MatchState$inboundSchema,
    no_profile_to_check: types.optional(types.boolean()),
    highest_band: types.nullable(HighestBand$inboundSchema),
    decision: types.nullable(PersonDecision$inboundSchema),
    decision_note: types.optional(types.string()),
    decided_by: types.optional(types.string()),
    decided_at: types.optional(types.string()),
    coverage: ScreeningCoverage$inboundSchema,
    last_screening_id: types.optional(types.string()),
    screened_at: types.optional(types.string()),
    created_at: types.string(),
    updated_at: types.string(),
    spend: ScreeningSpend$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "group_id": "groupId",
      "external_id": "externalId",
      "match_state": "matchState",
      "no_profile_to_check": "noProfileToCheck",
      "highest_band": "highestBand",
      "decision_note": "decisionNote",
      "decided_by": "decidedBy",
      "decided_at": "decidedAt",
      "last_screening_id": "lastScreeningId",
      "screened_at": "screenedAt",
      "created_at": "createdAt",
      "updated_at": "updatedAt",
    });
  }),
);

export function personFromJSON(
  jsonString: string,
): SafeParseResult<Person, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Person$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Person' from JSON`,
  );
}
