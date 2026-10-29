import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * The list action captured at the first answer. Requires revision first. Older answers without captured list state do not match, including none.
 */
export const ListMatch = {
  Allow: "allow",
  Block: "block",
  None: "none",
} as const;
/**
 * The list action captured at the first answer. Requires revision first. Older answers without captured list state do not match, including none.
 */
export type ListMatch = ClosedEnum<typeof ListMatch>;

/** @internal */
export const ListMatch$outboundSchema: z.ZodMiniEnum<typeof ListMatch> = z.enum(
  ListMatch,
);
