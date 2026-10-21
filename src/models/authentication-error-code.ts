import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 401 answer can carry.
 */
export const AuthenticationErrorCode = {
  Unauthorized: "unauthorized",
} as const;
/**
 * Machine codes an HTTP 401 answer can carry.
 */
export type AuthenticationErrorCode = OpenEnum<typeof AuthenticationErrorCode>;

/** @internal */
export const AuthenticationErrorCode$inboundSchema: z.ZodMiniType<
  AuthenticationErrorCode,
  unknown
> = openEnums.inboundSchema(AuthenticationErrorCode);
