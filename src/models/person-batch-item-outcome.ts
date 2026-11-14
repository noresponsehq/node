import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * unchanged: the row matched a person with the same details.
 */
export const PersonBatchItemOutcome = {
  Created: "created",
  Updated: "updated",
  Unchanged: "unchanged",
} as const;
/**
 * unchanged: the row matched a person with the same details.
 */
export type PersonBatchItemOutcome = OpenEnum<typeof PersonBatchItemOutcome>;

/** @internal */
export const PersonBatchItemOutcome$inboundSchema: z.ZodMiniType<
  PersonBatchItemOutcome,
  unknown
> = openEnums.inboundSchema(PersonBatchItemOutcome);
