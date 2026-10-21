import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * Client platform. Closed vocabulary keeps integrations stable.
 */
export const Platform = {
  Web: "web",
  Ios: "ios",
  Android: "android",
  Other: "other",
} as const;
/**
 * Client platform. Closed vocabulary keeps integrations stable.
 */
export type Platform = ClosedEnum<typeof Platform>;

/** @internal */
export const Platform$outboundSchema: z.ZodMiniEnum<typeof Platform> = z.enum(
  Platform,
);
