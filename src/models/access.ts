import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * public profiles were read; a private or locked one exists but could not be read.
 */
export const Access = {
  Public: "public",
  Private: "private",
  Locked: "locked",
} as const;
/**
 * public profiles were read; a private or locked one exists but could not be read.
 */
export type Access = OpenEnum<typeof Access>;

/** @internal */
export const Access$inboundSchema: z.ZodMiniType<Access, unknown> = openEnums
  .inboundSchema(Access);
