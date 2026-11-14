import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * How sure the screening is that the accounts it read are the person's. A finding on a possible match is at most moderate, on a probable match at most high.
 */
export const PersonFlaggedMatchState = {
  Confirmed: "confirmed",
  Probable: "probable",
  Possible: "possible",
  NoneFound: "none_found",
  Inaccessible: "inaccessible",
} as const;
/**
 * How sure the screening is that the accounts it read are the person's. A finding on a possible match is at most moderate, on a probable match at most high.
 */
export type PersonFlaggedMatchState = ClosedEnum<
  typeof PersonFlaggedMatchState
>;

/** @internal */
export const PersonFlaggedMatchState$inboundSchema: z.ZodMiniEnum<
  typeof PersonFlaggedMatchState
> = z.enum(PersonFlaggedMatchState);
/** @internal */
export const PersonFlaggedMatchState$outboundSchema: z.ZodMiniEnum<
  typeof PersonFlaggedMatchState
> = PersonFlaggedMatchState$inboundSchema;
