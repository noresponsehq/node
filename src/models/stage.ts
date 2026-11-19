import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * ai_typing and analysis appear only on searches recorded before the engine stopped analysing results.
 */
export const Stage = {
  Lookup: "lookup",
  LookupTyping: "lookup_typing",
  Platforms: "platforms",
  Written: "written",
  LatePlatforms: "late_platforms",
  LateLookup: "late_lookup",
  AiTyping: "ai_typing",
  Analysis: "analysis",
  Rating: "rating",
} as const;
/**
 * ai_typing and analysis appear only on searches recorded before the engine stopped analysing results.
 */
export type Stage = OpenEnum<typeof Stage>;

/** @internal */
export const Stage$inboundSchema: z.ZodMiniType<Stage, unknown> = openEnums
  .inboundSchema(Stage);
