import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Evidence coverage: how much of the planned source evidence gave a definite answer. This is not confidence that an identity is genuine, agreement between identifiers, a risk score or a probability. unavailable means no usable evidence answered; a terminal uncovered assessment can have this value and recommend review.
 */
export const Confidence = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Unavailable: "unavailable",
} as const;
/**
 * Evidence coverage: how much of the planned source evidence gave a definite answer. This is not confidence that an identity is genuine, agreement between identifiers, a risk score or a probability. unavailable means no usable evidence answered; a terminal uncovered assessment can have this value and recommend review.
 */
export type Confidence = OpenEnum<typeof Confidence>;

/** @internal */
export const Confidence$inboundSchema: z.ZodMiniType<Confidence, unknown> =
  openEnums.inboundSchema(Confidence);
/** @internal */
export const Confidence$outboundSchema: z.ZodMiniType<string, Confidence> =
  openEnums.outboundSchema(Confidence);
