import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

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
export type ResponseMode = OpenEnum<typeof ResponseMode>;

/** @internal */
export const ResponseMode$inboundSchema: z.ZodMiniType<ResponseMode, unknown> =
  openEnums.inboundSchema(ResponseMode);
/** @internal */
export const ResponseMode$outboundSchema: z.ZodMiniType<string, ResponseMode> =
  openEnums.outboundSchema(ResponseMode);
