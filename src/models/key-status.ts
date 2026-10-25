import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * active: the key authenticates. expired: a rotation's overlap window has ended (expires_at). revoked: the key was revoked (revoked_at) and answers 401.
 */
export const KeyStatus = {
  Active: "active",
  Expired: "expired",
  Revoked: "revoked",
} as const;
/**
 * active: the key authenticates. expired: a rotation's overlap window has ended (expires_at). revoked: the key was revoked (revoked_at) and answers 401.
 */
export type KeyStatus = OpenEnum<typeof KeyStatus>;

/** @internal */
export const KeyStatus$inboundSchema: z.ZodMiniType<KeyStatus, unknown> =
  openEnums.inboundSchema(KeyStatus);
