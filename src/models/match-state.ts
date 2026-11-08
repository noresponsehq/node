import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * How sure the latest screening is that it found the attendee's accounts. unscreened until a screening reaches the attendee.
 */
export const MatchState = {
  Unscreened: "unscreened",
  Confirmed: "confirmed",
  Probable: "probable",
  Possible: "possible",
  NoneFound: "none_found",
  Inaccessible: "inaccessible",
} as const;
/**
 * How sure the latest screening is that it found the attendee's accounts. unscreened until a screening reaches the attendee.
 */
export type MatchState = OpenEnum<typeof MatchState>;

/** @internal */
export const MatchState$inboundSchema: z.ZodMiniType<MatchState, unknown> =
  openEnums.inboundSchema(MatchState);
