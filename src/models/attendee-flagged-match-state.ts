import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * How sure the screening is that the accounts it read are the attendee's. A finding on a possible match is at most moderate, on a probable match at most high.
 */
export const AttendeeFlaggedMatchState = {
  Confirmed: "confirmed",
  Probable: "probable",
  Possible: "possible",
  NoneFound: "none_found",
  Inaccessible: "inaccessible",
} as const;
/**
 * How sure the screening is that the accounts it read are the attendee's. A finding on a possible match is at most moderate, on a probable match at most high.
 */
export type AttendeeFlaggedMatchState = ClosedEnum<
  typeof AttendeeFlaggedMatchState
>;

/** @internal */
export const AttendeeFlaggedMatchState$inboundSchema: z.ZodMiniEnum<
  typeof AttendeeFlaggedMatchState
> = z.enum(AttendeeFlaggedMatchState);
/** @internal */
export const AttendeeFlaggedMatchState$outboundSchema: z.ZodMiniEnum<
  typeof AttendeeFlaggedMatchState
> = AttendeeFlaggedMatchState$inboundSchema;
