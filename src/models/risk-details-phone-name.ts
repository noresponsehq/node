import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type RiskDetailsPhoneName = {
  value: string;
  seenBy: number;
};

/** @internal */
export const RiskDetailsPhoneName$inboundSchema: z.ZodMiniType<
  RiskDetailsPhoneName,
  unknown
> = z.pipe(
  z.object({
    value: types.string(),
    seen_by: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "seen_by": "seenBy",
    });
  }),
);
/** @internal */
export type RiskDetailsPhoneName$Outbound = {
  value: string;
  seen_by: number;
};

/** @internal */
export const RiskDetailsPhoneName$outboundSchema: z.ZodMiniType<
  RiskDetailsPhoneName$Outbound,
  RiskDetailsPhoneName
> = z.pipe(
  z.object({
    value: z.string(),
    seenBy: z.int(),
  }),
  z.transform((v) => {
    return remap$(v, {
      seenBy: "seen_by",
    });
  }),
);

export function riskDetailsPhoneNameToJSON(
  riskDetailsPhoneName: RiskDetailsPhoneName,
): string {
  return JSON.stringify(
    RiskDetailsPhoneName$outboundSchema.parse(riskDetailsPhoneName),
  );
}
export function riskDetailsPhoneNameFromJSON(
  jsonString: string,
): SafeParseResult<RiskDetailsPhoneName, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskDetailsPhoneName$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskDetailsPhoneName' from JSON`,
  );
}
