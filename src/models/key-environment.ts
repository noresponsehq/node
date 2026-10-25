import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.
 */
export const KeyEnvironment = {
  Live: "live",
  Test: "test",
} as const;
/**
 * The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.
 */
export type KeyEnvironment = OpenEnum<typeof KeyEnvironment>;

/** @internal */
export const KeyEnvironment$inboundSchema: z.ZodMiniType<
  KeyEnvironment,
  unknown
> = openEnums.inboundSchema(KeyEnvironment);
/** @internal */
export const KeyEnvironment$outboundSchema: z.ZodMiniType<
  string,
  KeyEnvironment
> = openEnums.outboundSchema(KeyEnvironment);
