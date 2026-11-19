import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * One rule ranks every change: identity changes (accounts, breaches, identifiers) are high, profile fields are medium, new posts are low.
 */
export const Significance = {
  High: "high",
  Medium: "medium",
  Low: "low",
} as const;
/**
 * One rule ranks every change: identity changes (accounts, breaches, identifiers) are high, profile fields are medium, new posts are low.
 */
export type Significance = OpenEnum<typeof Significance>;

/** @internal */
export const Significance$inboundSchema: z.ZodMiniType<Significance, unknown> =
  openEnums.inboundSchema(Significance);
