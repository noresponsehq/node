import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Listed and returned members are active.
 */
export const MemberStatus = {
  Active: "active",
} as const;
/**
 * Listed and returned members are active.
 */
export type MemberStatus = OpenEnum<typeof MemberStatus>;

/** @internal */
export const MemberStatus$inboundSchema: z.ZodMiniType<MemberStatus, unknown> =
  openEnums.inboundSchema(MemberStatus);
