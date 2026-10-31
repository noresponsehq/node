import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  Attribute,
  Attribute$inboundSchema,
  Attribute$outboundSchema,
} from "./attribute.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type RiskDetailsAttributeConflict = {
  /**
   * name_gender is the records' gender against the submitted first name's usual one.
   */
  attribute: Attribute;
  /**
   * The domains of the breached sites whose tables report the attribute, newest breach first, at most 32. Absent when none of the tables has a site.
   */
  sites?: Array<string> | undefined;
  /**
   * How many of the tables reporting the attribute have no site, such as a credential list or a stealer log. Absent when none.
   */
  unsited?: number | undefined;
};

/** @internal */
export const RiskDetailsAttributeConflict$inboundSchema: z.ZodMiniType<
  RiskDetailsAttributeConflict,
  unknown
> = z.object({
  attribute: Attribute$inboundSchema,
  sites: types.optional(z.array(types.string())),
  unsited: types.optional(types.number()),
});
/** @internal */
export type RiskDetailsAttributeConflict$Outbound = {
  attribute: string;
  sites?: Array<string> | undefined;
  unsited?: number | undefined;
};

/** @internal */
export const RiskDetailsAttributeConflict$outboundSchema: z.ZodMiniType<
  RiskDetailsAttributeConflict$Outbound,
  RiskDetailsAttributeConflict
> = z.object({
  attribute: Attribute$outboundSchema,
  sites: z.optional(z.array(z.string())),
  unsited: z.optional(z.int()),
});

export function riskDetailsAttributeConflictToJSON(
  riskDetailsAttributeConflict: RiskDetailsAttributeConflict,
): string {
  return JSON.stringify(
    RiskDetailsAttributeConflict$outboundSchema.parse(
      riskDetailsAttributeConflict,
    ),
  );
}
export function riskDetailsAttributeConflictFromJSON(
  jsonString: string,
): SafeParseResult<RiskDetailsAttributeConflict, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskDetailsAttributeConflict$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskDetailsAttributeConflict' from JSON`,
  );
}
