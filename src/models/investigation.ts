import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { HighestBand, HighestBand$inboundSchema } from "./highest-band.js";
import {
  InvestigationStatus,
  InvestigationStatus$inboundSchema,
} from "./investigation-status.js";
import { MatchState, MatchState$inboundSchema } from "./match-state.js";
import {
  PersonDecision,
  PersonDecision$inboundSchema,
} from "./person-decision.js";
import {
  ScreeningCoverage,
  ScreeningCoverage$inboundSchema,
} from "./screening-coverage.js";
import {
  ScreeningDepth,
  ScreeningDepth$inboundSchema,
} from "./screening-depth.js";
import {
  ScreeningSpend,
  ScreeningSpend$inboundSchema,
} from "./screening-spend.js";

export type Investigation = {
  /**
   * The most severe finding's band, or null when nothing was flagged.
   */
  highestBand: HighestBand | null;
  /**
   * The denominator of a screening: accounts found, how many could be read, items read and the period they span, so a clean result is distinct from a person nobody could see.
   */
  coverage: ScreeningCoverage;
  /**
   * What screening cost, in US cents, in total and per implementation.
   */
  spend: ScreeningSpend;
  /**
   * The latest reviewer decision, or null before any.
   */
  decision: PersonDecision | null;
  decisionNote?: string | undefined;
  decidedBy?: string | undefined;
  decidedAt?: string | undefined;
  id: string;
  personId: string;
  groupId: string | null;
  status: InvestigationStatus;
  depth: ScreeningDepth;
  platforms: Array<string>;
  matchState: MatchState | null;
  errorCode?: string | undefined;
  createdAt: string;
  startedAt?: string | undefined;
  finishedAt?: string | undefined;
  expiresAt: string;
  deadlineAt: string;
};

/** @internal */
export const Investigation$inboundSchema: z.ZodMiniType<
  Investigation,
  unknown
> = z.pipe(
  z.object({
    highest_band: types.nullable(HighestBand$inboundSchema),
    coverage: ScreeningCoverage$inboundSchema,
    spend: ScreeningSpend$inboundSchema,
    decision: types.nullable(PersonDecision$inboundSchema),
    decision_note: types.optional(types.string()),
    decided_by: types.optional(types.string()),
    decided_at: types.optional(types.string()),
    id: types.string(),
    person_id: types.string(),
    group_id: types.nullable(types.string()),
    status: InvestigationStatus$inboundSchema,
    depth: ScreeningDepth$inboundSchema,
    platforms: z.array(types.string()),
    match_state: types.nullable(MatchState$inboundSchema),
    error_code: types.optional(types.string()),
    created_at: types.string(),
    started_at: types.optional(types.string()),
    finished_at: types.optional(types.string()),
    expires_at: types.string(),
    deadline_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "highest_band": "highestBand",
      "decision_note": "decisionNote",
      "decided_by": "decidedBy",
      "decided_at": "decidedAt",
      "person_id": "personId",
      "group_id": "groupId",
      "match_state": "matchState",
      "error_code": "errorCode",
      "created_at": "createdAt",
      "started_at": "startedAt",
      "finished_at": "finishedAt",
      "expires_at": "expiresAt",
      "deadline_at": "deadlineAt",
    });
  }),
);

export function investigationFromJSON(
  jsonString: string,
): SafeParseResult<Investigation, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Investigation$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Investigation' from JSON`,
  );
}
