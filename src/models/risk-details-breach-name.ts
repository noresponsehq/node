import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type RiskDetailsBreachName = {
  value: string;
  seenIn: number;
};

/** @internal */
export const RiskDetailsBreachName$inboundSchema: z.ZodMiniType<
  RiskDetailsBreachName,
  unknown
> = z.pipe(
  z.object({
    value: types.string(),
    seen_in: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "seen_in": "seenIn",
    });
  }),
);
/** @internal */
export type RiskDetailsBreachName$Outbound = {
  value: string;
  seen_in: number;
};

/** @internal */
export const RiskDetailsBreachName$outboundSchema: z.ZodMiniType<
  RiskDetailsBreachName$Outbound,
  RiskDetailsBreachName
> = z.pipe(
  z.object({
    value: z.string(),
    seenIn: z.int(),
  }),
  z.transform((v) => {
    return remap$(v, {
      seenIn: "seen_in",
    });
  }),
);

export function riskDetailsBreachNameToJSON(
  riskDetailsBreachName: RiskDetailsBreachName,
): string {
  return JSON.stringify(
    RiskDetailsBreachName$outboundSchema.parse(riskDetailsBreachName),
  );
}
export function riskDetailsBreachNameFromJSON(
  jsonString: string,
): SafeParseResult<RiskDetailsBreachName, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskDetailsBreachName$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskDetailsBreachName' from JSON`,
  );
}
