import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
 */
export const ResponseMode = {
  Standard: "standard",
  Detailed: "detailed",
} as const;
/**
 * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
 */
export type ResponseMode = ClosedEnum<typeof ResponseMode>;

/** @internal */
export const ResponseMode$outboundSchema: z.ZodMiniEnum<typeof ResponseMode> = z
  .enum(ResponseMode);
