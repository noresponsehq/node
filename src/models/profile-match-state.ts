import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * How sure the screening is that a profile is the person's, from the likelihood its record scores. Confirmed reaches the join bar of 0.9. Probable reaches 0.85, which takes a shared value beyond the one that found the account. Possible is the rest.
 */
export const ProfileMatchState = {
  Confirmed: "confirmed",
  Probable: "probable",
  Possible: "possible",
} as const;
/**
 * How sure the screening is that a profile is the person's, from the likelihood its record scores. Confirmed reaches the join bar of 0.9. Probable reaches 0.85, which takes a shared value beyond the one that found the account. Possible is the rest.
 */
export type ProfileMatchState = OpenEnum<typeof ProfileMatchState>;

/** @internal */
export const ProfileMatchState$inboundSchema: z.ZodMiniType<
  ProfileMatchState,
  unknown
> = openEnums.inboundSchema(ProfileMatchState);
