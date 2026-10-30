import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 403 answer can carry.
 */
export const PermissionDeniedErrorCode = {
  WorkspaceForbidden: "workspace_forbidden",
  RoleForbidden: "role_forbidden",
  EmailUnverified: "email_unverified",
  OnboardingInReview: "onboarding_in_review",
  OnboardingRefused: "onboarding_refused",
} as const;
/**
 * Machine codes an HTTP 403 answer can carry.
 */
export type PermissionDeniedErrorCode = OpenEnum<
  typeof PermissionDeniedErrorCode
>;

/** @internal */
export const PermissionDeniedErrorCode$inboundSchema: z.ZodMiniType<
  PermissionDeniedErrorCode,
  unknown
> = openEnums.inboundSchema(PermissionDeniedErrorCode);
