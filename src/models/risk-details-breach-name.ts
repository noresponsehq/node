import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type RiskDetailsBreachName = {
  value: string;
  seenIn: number;
  /**
   * The domains of the breached sites whose tables hold the name, lower case, each once, newest breach first, at most 32: the domain values of breaches[]. Covers the email's and the username's tables together. Absent when none of the tables has a site.
   */
  sites?: Array<string> | undefined;
  /**
   * How many of the tables that hold the name have no site, such as a credential list or a stealer log. Absent when none.
   */
  unsited?: number | undefined;
};

/** @internal */
export const RiskDetailsBreachName$inboundSchema: z.ZodMiniType<
  RiskDetailsBreachName,
  unknown
> = z.pipe(
  z.object({
    value: types.string(),
    seen_in: types.number(),
    sites: types.optional(z.array(types.string())),
    unsited: types.optional(types.number()),
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
  sites?: Array<string> | undefined;
  unsited?: number | undefined;
};

/** @internal */
export const RiskDetailsBreachName$outboundSchema: z.ZodMiniType<
  RiskDetailsBreachName$Outbound,
  RiskDetailsBreachName
> = z.pipe(
  z.object({
    value: z.string(),
    seenIn: z.int(),
    sites: z.optional(z.array(z.string())),
    unsited: z.optional(z.int()),
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
