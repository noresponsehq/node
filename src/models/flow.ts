import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * The provider flow the assessment gates. Use the top-level flow instead; this member is ignored when the top-level flow is present. Absent means signup.
 */
export const Flow = {
  Signup: "signup",
  Login: "login",
  Recovery: "recovery",
  ProfileChange: "profile_change",
} as const;
/**
 * The provider flow the assessment gates. Use the top-level flow instead; this member is ignored when the top-level flow is present. Absent means signup.
 */
export type Flow = ClosedEnum<typeof Flow>;

/** @internal */
export const Flow$outboundSchema: z.ZodMiniEnum<typeof Flow> = z.enum(Flow);
