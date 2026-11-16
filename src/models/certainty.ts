import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * confirmed: a linked record or the searched identifier states it directly. likely: a strong inference. possible: a weak inference.
 */
export const Certainty = {
  Confirmed: "confirmed",
  Likely: "likely",
  Possible: "possible",
} as const;
/**
 * confirmed: a linked record or the searched identifier states it directly. likely: a strong inference. possible: a weak inference.
 */
export type Certainty = OpenEnum<typeof Certainty>;

/** @internal */
export const Certainty$inboundSchema: z.ZodMiniType<Certainty, unknown> =
  openEnums.inboundSchema(Certainty);
