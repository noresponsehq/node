import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * unchanged: the row matched an attendee with the same details.
 */
export const AttendeeBatchItemOutcome = {
  Created: "created",
  Updated: "updated",
  Unchanged: "unchanged",
} as const;
/**
 * unchanged: the row matched an attendee with the same details.
 */
export type AttendeeBatchItemOutcome = OpenEnum<
  typeof AttendeeBatchItemOutcome
>;

/** @internal */
export const AttendeeBatchItemOutcome$inboundSchema: z.ZodMiniType<
  AttendeeBatchItemOutcome,
  unknown
> = openEnums.inboundSchema(AttendeeBatchItemOutcome);
