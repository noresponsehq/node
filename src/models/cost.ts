import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

export type Cost = {
  allow: number;
  stepUp: number;
  review: number;
  block: number;
};

/** @internal */
export type Cost$Outbound = {
  allow: number;
  step_up: number;
  review: number;
  block: number;
};

/** @internal */
export const Cost$outboundSchema: z.ZodMiniType<Cost$Outbound, Cost> = z.pipe(
  z.object({
    allow: z.number(),
    stepUp: z.number(),
    review: z.number(),
    block: z.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      stepUp: "step_up",
    });
  }),
);

export function costToJSON(cost: Cost): string {
  return JSON.stringify(Cost$outboundSchema.parse(cost));
}
