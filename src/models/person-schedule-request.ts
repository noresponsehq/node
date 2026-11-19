import * as z from "zod/v4-mini";
import {
  SchedulePeriod,
  SchedulePeriod$outboundSchema,
} from "./schedule-period.js";

/**
 * The schedule to set.
 */
export type PersonScheduleRequest = {
  /**
   * How often the person is investigated again: daily, weekly or monthly, counted from when the schedule was set; off runs no scheduled investigation.
   */
  period: SchedulePeriod;
};

/** @internal */
export type PersonScheduleRequest$Outbound = {
  period: string;
};

/** @internal */
export const PersonScheduleRequest$outboundSchema: z.ZodMiniType<
  PersonScheduleRequest$Outbound,
  PersonScheduleRequest
> = z.object({
  period: SchedulePeriod$outboundSchema,
});

export function personScheduleRequestToJSON(
  personScheduleRequest: PersonScheduleRequest,
): string {
  return JSON.stringify(
    PersonScheduleRequest$outboundSchema.parse(personScheduleRequest),
  );
}
