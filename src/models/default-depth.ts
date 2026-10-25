import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The depth a request for this flow that names none is served at. Defaults: full for account_creation and purchase, quick for login.
 */
export const DefaultDepth = {
  Quick: "quick",
  Full: "full",
} as const;
/**
 * The depth a request for this flow that names none is served at. Defaults: full for account_creation and purchase, quick for login.
 */
export type DefaultDepth = OpenEnum<typeof DefaultDepth>;

/** @internal */
export const DefaultDepth$inboundSchema: z.ZodMiniType<DefaultDepth, unknown> =
  openEnums.inboundSchema(DefaultDepth);
/** @internal */
export const DefaultDepth$outboundSchema: z.ZodMiniType<string, DefaultDepth> =
  openEnums.outboundSchema(DefaultDepth);
