import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * How sure the screening is that a profile is the person's, from its evidence: confirmed is a handle on the person row, or two or more hard identifiers (email, phone, a supplied handle, or a fact an existing source returned); probable is one identifier beyond the name; possible is the name alone.
 */
export const ProfileMatchState = {
  Confirmed: "confirmed",
  Probable: "probable",
  Possible: "possible",
} as const;
/**
 * How sure the screening is that a profile is the person's, from its evidence: confirmed is a handle on the person row, or two or more hard identifiers (email, phone, a supplied handle, or a fact an existing source returned); probable is one identifier beyond the name; possible is the name alone.
 */
export type ProfileMatchState = OpenEnum<typeof ProfileMatchState>;

/** @internal */
export const ProfileMatchState$inboundSchema: z.ZodMiniType<
  ProfileMatchState,
  unknown
> = openEnums.inboundSchema(ProfileMatchState);
