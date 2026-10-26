import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AttributeAgreement,
  AttributeAgreement$inboundSchema,
  AttributeAgreement$Outbound,
  AttributeAgreement$outboundSchema,
} from "./attribute-agreement.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type FootprintCoherence = {
  /**
   * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
   */
  birthDate?: AttributeAgreement | undefined;
  /**
   * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
   */
  gender?: AttributeAgreement | undefined;
  /**
   * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
   */
  nationality?: AttributeAgreement | undefined;
  /**
   * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
   */
  country?: AttributeAgreement | undefined;
  /**
   * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
   */
  city?: AttributeAgreement | undefined;
  /**
   * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
   */
  zip?: AttributeAgreement | undefined;
  /**
   * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
   */
  name?: AttributeAgreement | undefined;
  /**
   * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
   */
  company?: AttributeAgreement | undefined;
  /**
   * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
   */
  website?: AttributeAgreement | undefined;
  /**
   * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
   */
  social?: AttributeAgreement | undefined;
};

/** @internal */
export const FootprintCoherence$inboundSchema: z.ZodMiniType<
  FootprintCoherence,
  unknown
> = z.pipe(
  z.object({
    birth_date: types.optional(AttributeAgreement$inboundSchema),
    gender: types.optional(AttributeAgreement$inboundSchema),
    nationality: types.optional(AttributeAgreement$inboundSchema),
    country: types.optional(AttributeAgreement$inboundSchema),
    city: types.optional(AttributeAgreement$inboundSchema),
    zip: types.optional(AttributeAgreement$inboundSchema),
    name: types.optional(AttributeAgreement$inboundSchema),
    company: types.optional(AttributeAgreement$inboundSchema),
    website: types.optional(AttributeAgreement$inboundSchema),
    social: types.optional(AttributeAgreement$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "birth_date": "birthDate",
    });
  }),
);
/** @internal */
export type FootprintCoherence$Outbound = {
  birth_date?: AttributeAgreement$Outbound | undefined;
  gender?: AttributeAgreement$Outbound | undefined;
  nationality?: AttributeAgreement$Outbound | undefined;
  country?: AttributeAgreement$Outbound | undefined;
  city?: AttributeAgreement$Outbound | undefined;
  zip?: AttributeAgreement$Outbound | undefined;
  name?: AttributeAgreement$Outbound | undefined;
  company?: AttributeAgreement$Outbound | undefined;
  website?: AttributeAgreement$Outbound | undefined;
  social?: AttributeAgreement$Outbound | undefined;
};

/** @internal */
export const FootprintCoherence$outboundSchema: z.ZodMiniType<
  FootprintCoherence$Outbound,
  FootprintCoherence
> = z.pipe(
  z.object({
    birthDate: z.optional(AttributeAgreement$outboundSchema),
    gender: z.optional(AttributeAgreement$outboundSchema),
    nationality: z.optional(AttributeAgreement$outboundSchema),
    country: z.optional(AttributeAgreement$outboundSchema),
    city: z.optional(AttributeAgreement$outboundSchema),
    zip: z.optional(AttributeAgreement$outboundSchema),
    name: z.optional(AttributeAgreement$outboundSchema),
    company: z.optional(AttributeAgreement$outboundSchema),
    website: z.optional(AttributeAgreement$outboundSchema),
    social: z.optional(AttributeAgreement$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      birthDate: "birth_date",
    });
  }),
);

export function footprintCoherenceToJSON(
  footprintCoherence: FootprintCoherence,
): string {
  return JSON.stringify(
    FootprintCoherence$outboundSchema.parse(footprintCoherence),
  );
}
export function footprintCoherenceFromJSON(
  jsonString: string,
): SafeParseResult<FootprintCoherence, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => FootprintCoherence$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'FootprintCoherence' from JSON`,
  );
}
