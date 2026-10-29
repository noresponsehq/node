import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const Environment = {
  Live: "live",
  Test: "test",
  Workspace: "workspace",
} as const;
export type Environment = OpenEnum<typeof Environment>;

/** @internal */
export const Environment$inboundSchema: z.ZodMiniType<Environment, unknown> =
  openEnums.inboundSchema(Environment);
/** @internal */
export const Environment$outboundSchema: z.ZodMiniType<string, Environment> =
  openEnums.outboundSchema(Environment);
