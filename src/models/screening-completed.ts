import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningCompletedStatus,
  ScreeningCompletedStatus$inboundSchema,
  ScreeningCompletedStatus$outboundSchema,
} from "./screening-completed-status.js";

/**
 * A screening of a group finished. It counts only the people this screening set out to reach, not who they are: read the roster with GET /v1/workspaces/{workspace_id}/groups/{environment}/{group_id}/people to act on them. people_screened + partial_coverage = people_total, no_footprint counts screened people whose accounts were not found, and no_profile_to_check those the screening had nothing to look up for on any requested platform. A cancelled screening sends no event.
 */
export type ScreeningCompleted = {
  /**
   * The screening that finished.
   */
  screeningId: string;
  /**
   * The group it screened.
   */
  groupId: string;
  /**
   * completed reached every person; partial left some not fully covered (partial_coverage); failed covered nobody.
   */
  status: ScreeningCompletedStatus;
  /**
   * Why a partial or failed screening stopped before reaching everyone, as the screening resource says: expired, worker_attempts_exhausted, attempts_exhausted or screening_unavailable.
   */
  errorCode?: string | undefined;
  /**
   * Every person the screening set out to reach: those no screening had reached.
   */
  peopleTotal: number;
  /**
   * People the screening covered.
   */
  peopleScreened: number;
  /**
   * Screened people whose accounts were not found (match_state none_found). A clean result for someone with no visible accounts is not the same as a clean result for someone whose accounts were read.
   */
  noFootprint: number;
  /**
   * Screened people with no profile to check: the list gave nothing to look up on any requested platform, such as no handle, so nobody looked for a profile (no_profile_to_check on the person). Not in no_footprint, and not partial: nothing failed. Their lookups are on their reports.
   */
  noProfileToCheck?: number | undefined;
  /**
   * People the screening did not fully cover. Read each one's coverage on its person.
   */
  partialCoverage: number;
  /**
   * When the screening finished; equal to the event's created_at.
   */
  finishedAt: string;
};

/** @internal */
export const ScreeningCompleted$inboundSchema: z.ZodMiniType<
  ScreeningCompleted,
  unknown
> = z.pipe(
  z.object({
    screening_id: types.string(),
    group_id: types.string(),
    status: ScreeningCompletedStatus$inboundSchema,
    error_code: types.optional(types.string()),
    people_total: types.number(),
    people_screened: types.number(),
    no_footprint: types.number(),
    no_profile_to_check: types.optional(types.number()),
    partial_coverage: types.number(),
    finished_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "screening_id": "screeningId",
      "group_id": "groupId",
      "error_code": "errorCode",
      "people_total": "peopleTotal",
      "people_screened": "peopleScreened",
      "no_footprint": "noFootprint",
      "no_profile_to_check": "noProfileToCheck",
      "partial_coverage": "partialCoverage",
      "finished_at": "finishedAt",
    });
  }),
);
/** @internal */
export type ScreeningCompleted$Outbound = {
  screening_id: string;
  group_id: string;
  status: string;
  error_code?: string | undefined;
  people_total: number;
  people_screened: number;
  no_footprint: number;
  no_profile_to_check?: number | undefined;
  partial_coverage: number;
  finished_at: string;
};

/** @internal */
export const ScreeningCompleted$outboundSchema: z.ZodMiniType<
  ScreeningCompleted$Outbound,
  ScreeningCompleted
> = z.pipe(
  z.object({
    screeningId: z.string(),
    groupId: z.string(),
    status: ScreeningCompletedStatus$outboundSchema,
    errorCode: z.optional(z.string()),
    peopleTotal: z.int(),
    peopleScreened: z.int(),
    noFootprint: z.int(),
    noProfileToCheck: z.optional(z.int()),
    partialCoverage: z.int(),
    finishedAt: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      screeningId: "screening_id",
      groupId: "group_id",
      errorCode: "error_code",
      peopleTotal: "people_total",
      peopleScreened: "people_screened",
      noFootprint: "no_footprint",
      noProfileToCheck: "no_profile_to_check",
      partialCoverage: "partial_coverage",
      finishedAt: "finished_at",
    });
  }),
);

export function screeningCompletedToJSON(
  screeningCompleted: ScreeningCompleted,
): string {
  return JSON.stringify(
    ScreeningCompleted$outboundSchema.parse(screeningCompleted),
  );
}
export function screeningCompletedFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningCompleted, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningCompleted$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningCompleted' from JSON`,
  );
}
