import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * The environment whose endpoints receive this event: live, or test for the workspace's test environment.
 */
export const Environment = {
  Live: "live",
  Test: "test",
} as const;
/**
 * The environment whose endpoints receive this event: live, or test for the workspace's test environment.
 */
export type Environment = ClosedEnum<typeof Environment>;

/** @internal */
export const Environment$inboundSchema: z.ZodMiniEnum<typeof Environment> = z
  .enum(Environment);
/** @internal */
export const Environment$outboundSchema: z.ZodMiniEnum<typeof Environment> =
  Environment$inboundSchema;
