import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { LastError, LastError$inboundSchema } from "./last-error.js";
import {
  SchedulePeriod,
  SchedulePeriod$inboundSchema,
} from "./schedule-period.js";

/**
 * The person's rerun schedule. Each due run starts a full investigation of the person, as POST /v1/investigations with no platforms does, and its changes are stored as changes. The schedule lives in the database and the worker runs it, so it survives restarts and releases; each due run starts exactly one investigation.
 */
export type PersonSchedule = {
  /**
   * How often the person is investigated again: daily, weekly or monthly, counted from when the schedule was set; off runs no scheduled investigation.
   */
  period: SchedulePeriod;
  /**
   * When the next scheduled investigation starts, within a minute. null when the schedule is off.
   */
  nextRunAt: string | null;
  /**
   * The investigation the schedule last started. null before its first run.
   */
  lastInvestigationId: string | null;
  /**
   * Why the last due run started no investigation, as the problem code its start would have answered. null when the last due run started one, or none has come due. A run that started none is not retried: the schedule moves to its next period.
   */
  lastError: LastError | null;
  updatedAt: string | null;
  /**
   * Who last set the schedule.
   */
  updatedBy: string | null;
};

/** @internal */
export const PersonSchedule$inboundSchema: z.ZodMiniType<
  PersonSchedule,
  unknown
> = z.pipe(
  z.object({
    period: SchedulePeriod$inboundSchema,
    next_run_at: types.nullable(types.string()),
    last_investigation_id: types.nullable(types.string()),
    last_error: types.nullable(LastError$inboundSchema),
    updated_at: types.nullable(types.string()),
    updated_by: types.nullable(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "next_run_at": "nextRunAt",
      "last_investigation_id": "lastInvestigationId",
      "last_error": "lastError",
      "updated_at": "updatedAt",
      "updated_by": "updatedBy",
    });
  }),
);

export function personScheduleFromJSON(
  jsonString: string,
): SafeParseResult<PersonSchedule, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonSchedule$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonSchedule' from JSON`,
  );
}
