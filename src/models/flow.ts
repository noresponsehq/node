import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * The provider flow the assessment gates. Absent means signup.
 */
export const Flow = {
  Signup: "signup",
  Login: "login",
  Recovery: "recovery",
  ProfileChange: "profile_change",
} as const;
/**
 * The provider flow the assessment gates. Absent means signup.
 */
export type Flow = ClosedEnum<typeof Flow>;

/** @internal */
export const Flow$outboundSchema: z.ZodMiniEnum<typeof Flow> = z.enum(Flow);
