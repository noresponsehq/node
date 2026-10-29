import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type Thresholds = {
  stepUp: number;
  review: number;
  block: number | null;
};

/** @internal */
export const Thresholds$inboundSchema: z.ZodMiniType<Thresholds, unknown> = z
  .pipe(
    z.object({
      step_up: types.number(),
      review: types.number(),
      block: types.nullable(types.number()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "step_up": "stepUp",
      });
    }),
  );
/** @internal */
export type Thresholds$Outbound = {
  step_up: number;
  review: number;
  block: number | null;
};

/** @internal */
export const Thresholds$outboundSchema: z.ZodMiniType<
  Thresholds$Outbound,
  Thresholds
> = z.pipe(
  z.object({
    stepUp: z.int(),
    review: z.int(),
    block: z.nullable(z.int()),
  }),
  z.transform((v) => {
    return remap$(v, {
      stepUp: "step_up",
    });
  }),
);

export function thresholdsToJSON(thresholds: Thresholds): string {
  return JSON.stringify(Thresholds$outboundSchema.parse(thresholds));
}
export function thresholdsFromJSON(
  jsonString: string,
): SafeParseResult<Thresholds, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Thresholds$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Thresholds' from JSON`,
  );
}
