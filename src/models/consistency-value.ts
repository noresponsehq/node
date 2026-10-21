import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.
 */
export const ConsistencyValue = {
  Match: "match",
  Partial: "partial",
  Mismatch: "mismatch",
  Unknown: "unknown",
} as const;
/**
 * How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.
 */
export type ConsistencyValue = OpenEnum<typeof ConsistencyValue>;

/** @internal */
export const ConsistencyValue$inboundSchema: z.ZodMiniType<
  ConsistencyValue,
  unknown
> = openEnums.inboundSchema(ConsistencyValue);
